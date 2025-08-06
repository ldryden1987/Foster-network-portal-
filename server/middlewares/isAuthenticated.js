import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async function isAuthenticated(req, res, next) {
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
      return res.status(401).json({ error: "User not found. Invalid or expired token." });
    }
    if (user.role !== 'staff' && user.role !== 'admin') {
      return res.status(403).json({ error: "Access denied. Administrator privileges required." });
    }
    req.user = user;
    next(); //continue on to the route handler

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}