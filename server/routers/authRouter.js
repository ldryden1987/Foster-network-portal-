//AUTHENTICATION ROUTES
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import { Router } from 'express';
import User from '../models/User.js';

const app = express();
app.use(express.json());
const authRouter = Router();

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

authRouter.post('/signup', async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email.toLowerCase(), });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Encrypt password to store in the db
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({
            ...req.body,
            password: passwordHash,
            role: null,
            status: 'initial'
        });
        await newUser.save();
        // Create a sessionToken that is unique to one person _id and JWT Secret
        const sessionToken = jwt.sign(
            { _id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 * 24 }
        );
        res.json({ message: 'Sign up successful', sessionToken });
    } catch (err) {
        res.status(400).json({ error: err });
        console.log(err);
    }
});

//sign in route will issue a new sessionToken when the old one has expired
authRouter.post('/signin', async (req, res) => {
    try {
        
        const user = await User.findOne({
            email: req.body.email.toLowerCase(),
        });

        // Check if user exists BEFORE accessing password
        if (!user) {
            return res.status(400).json({ error: 'No user found' });
        }

        //if user exist, check pw
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).json( { error: "incorrect password"});
        }
            const sessionToken = jwt.sign(
            {_id: user._id},
            process.env.JWT_SECRET,
            //expires in 1 day
            { expiresIn: 60 *60 *24 }
        );
        res.status(200).json({ message: "Login Successful", sessionToken, user: user });

    } catch(err) {
        res.status(400).json({error: err});
        console.log(err);
    }
});

authRouter.get('/profile', authenticateToken, async (req, res) => {
    try {
        // req.user should be set by your authenticateToken middleware
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

export { authenticateToken }
export default authRouter