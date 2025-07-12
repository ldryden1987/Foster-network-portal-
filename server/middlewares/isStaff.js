import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async function isStaff(req, res, next) {
    try{
         // Get token from Authorization header
        const sessionToken = req.headers.authorization; // must be added to the value of the Authorization Key in the Headers in PostMan to test!
        if (!sessionToken) {
            return res.json({ error: "Authentication token missing. Please sign in to continue." });
        }
        // Verify and decode token
        const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET);
        // Find user by ID from token
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.json({ error: "User not found. Invalid or expired token." });
        }
        if (user.role !== 'staff') {
            return res.json({ error: "Access denied. Administrator privileges required." });
        }
        req.user = user;
        next(); //continue on to the route handler

    } catch (err) {
        res.json({ error: err });
    }
}