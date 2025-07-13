import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import { Router } from 'express';
import User from '../models/User.js';
import isAdminOrStaff from '../middlewares/isAdminOrStaff.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const app = express();
app.use(express.json());
const userRouter = Router();

//AUTHENTICATION ROUTES
userRouter.post('/signup', async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Encrypt password to store in the db
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({
            ...req.body,
            password: passwordHash,
            role: null,
            status: 'pending'
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
userRouter.post('/signin', async (req, res) => {
    try {
        
        const user = await User.findOne({
            email: req.body.email,
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

//ADMIN/STAFF ROUTES
// Get all users (Admin/Staff only)
//need to add filters
userRouter.get("/allUsers", isAdminOrStaff, async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); // Exclude password field
        
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }
        
        res.status(200).json({ 
            message: 'Users retrieved successfully', 
            count: users.length,
            users: users 
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Admin/Staff route to update other user's profiles.
userRouter.put("/updateUser/:user_ID", isAdminOrStaff, async (req, res) => {
    try {
        const user_id = req.params.user_ID;
        const existingUser = await User.findById(user_id);
        if (!existingUser) {
            return res.status(400).json({ error: 'User not found' });
        }
        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { ...req.body },
            { new: true }
        );
        //if user has no changes, return an error
        if (!updatedUser) {
            return res.json({ error: 'User must have changes to update' });
        }
        //return the updated user
        res.status(200).json({ notice: 'User updated successfully', message: updatedUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Dedicated route for admin/staff to reset user passwords
userRouter.put("/resetPasswordAdmin/:user_ID", isAdminOrStaff, async (req, res) => {
    try {
        const user_id = req.params.user_ID;
        const { newPassword } = req.body;

        // Validate that password is provided
        if (!newPassword) {
            return res.status(400).json({ error: 'New password is required' });
        }

        const existingUser = await User.findById(user_id);
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Hash the new password
        const passwordHash = bcrypt.hashSync(newPassword, 10);

        // Update only the password field
        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { password: passwordHash },
            { new: true }
        );

        res.status(200).json({ 
            notice: 'Password reset successfully', 
            message: `Password updated for user: ${updatedUser.email}` 
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//USER ROUTES
//allows users to see their own profile


//allows users to update their own profile except role, status, password, and autogenerated db items
userRouter.put("/updateProfile/:user_ID", isAuthenticated, async (req, res) => {
    try {
        const user_id = req.params.user_ID;
        const authenticatedUserId = req.user._id.toString(); // Get the authenticated user's ID
        
        // Check if user is trying to update their own profile
        if (user_id !== authenticatedUserId) {
            return res.status(403).json({ 
                error: 'Access denied. You can only update your own profile.' 
            });
        }
        // Define which fields users cannot update themselves
        const blockedFields = ['role', 'status', '_id', '__v', 'password'];
        const updates = {};
        //will filter out blocked keys
        Object.keys(req.body).forEach(key => {
            if (!blockedFields.includes(key)) {
                updates[key] = req.body[key];
            }
        });
        // Check if user tried to update blocked fields
        const attemptedBlockedFields = Object.keys(req.body).filter(key => 
            blockedFields.includes(key)
        );
        
        if (attemptedBlockedFields.length > 0) {
            return res.status(403).json({ 
                error: `Cannot update the following fields: ${attemptedBlockedFields.join(', ')}` 
            });
        }
        //Check if user tries to update blocked fields.
        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            updates, // Use filtered updates instead of { ...req.body }
            { new: true }
        );
        
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.status(200).json({ notice: 'Profile updated successfully', message: updatedUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Dedicated route for users to change their passwords
userRouter.put("/changePassword/:user_ID", isAuthenticated, async (req, res) => {
    try {
        const user_id = req.params.user_ID;
        const authenticatedUserId = req.user._id.toString(); // Get the authenticated user's ID
        const { currentPassword, newPassword } = req.body;

        // Validate that password is provided
        if (!newPassword) {
            return res.status(400).json({ error: 'New password is required' });
        }

        // Check if user is trying to update their own profile
        if (user_id !== authenticatedUserId) {
            return res.status(403).json({ 
                error: 'Access denied. You can only update your own password.' 
            });
        }
        
        // Get the user to verify current password
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify current password
        if (!bcrypt.compareSync(currentPassword, user.password)) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Hash the new password
        const passwordHash = bcrypt.hashSync(newPassword, 10);

        // Update only the password field
        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { password: passwordHash },
            { new: true }
        );

        res.status(200).json({ 
            notice: 'Password reset successfully', 
            message: `Password updated for user: ${updatedUser.email}` 
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default userRouter