import bcrypt from 'bcrypt';
import express from 'express';
import { Router } from 'express';
import User from '../models/User.js';
import isAdminOrStaff from '../middlewares/isAdminOrStaff.js';

const app = express();
app.use(express.json());
const staffRouter = Router();

//ADMIN/STAFF ROUTES
// Get all users (Admin/Staff only)
//need to add filters
staffRouter.get("/allUsers", isAdminOrStaff, async (req, res) => {
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
staffRouter.put("/updateUser/:user_ID", isAdminOrStaff, async (req, res) => {
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
staffRouter.put("/resetPasswordAdmin/:user_ID", isAdminOrStaff, async (req, res) => {
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

export default staffRouter