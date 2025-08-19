//AUTHENTICATION ROUTES
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import User from '../models/User.js';

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
        // Check if this is an admin creating a user (has Authorization header)
        const isAdminCreating = req.headers['authorization'];
        let requestorRole = null;
        
        if (isAdminCreating) {
            // Verify the admin token
            const token = req.headers['authorization'];
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const requestor = await User.findById(decoded._id);
                requestorRole = requestor?.role;
                
                // Only admin can create manager accounts
                if (req.body.role === 'manager' && requestorRole !== 'admin') {
                    return res.status(403).json({ error: 'Only admins can create manager accounts' });
                }
            } catch (err) {
                return res.status(403).json({ error: 'Invalid authorization token' });
            }
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Encrypt password to store in the db
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        
        const newUser = new User({
            ...req.body,
            password: passwordHash,
            role: isAdminCreating ? (req.body.role || 'initial') : 'initial',
            status: isAdminCreating ? 'approved' : 'initial' // Admin-created users are pre-approved
        });
        
        await newUser.save();

        // Only create session token for self-signup, not admin-created accounts
        if (!isAdminCreating) {
            const sessionToken = jwt.sign(
                { _id: newUser._id },
                process.env.JWT_SECRET,
                { expiresIn: 60 * 60 * 24 }
            );
             // Add user data to self-signup response
    const userResponse = newUser.toObject();
    delete userResponse.password;
            res.json({ message: 'Sign up successful', sessionToken, user: userResponse });
        } else {
            // Admin creating user - don't return session token
            const userResponse = newUser.toObject();
            delete userResponse.password;
            res.status(201).json({ 
                message: `${newUser.role} created successfully`, 
                user: userResponse 
            });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
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
            { _id: user._id },
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