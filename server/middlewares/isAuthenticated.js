import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async function isAuthenticated(req, res, next) {
    try {
        console.log("isAuthenticated middleware - Start");
        console.log("- Authorization header:", req.headers.authorization);
        
        const token = req.headers.authorization;
        if (!token) {
            console.log("isAuthenticated - No token provided");
            return res.status(401).json({ error: "Authorization token required" });
        }

        //token verification
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("isAuthenticated - Token decoded:", decoded);
        
        //decode token
        const user = await User.findById(decoded._id);
        if (!user) {
            console.log("isAuthenticated - User not found with ID:", decoded._id);
            return res.status(401).json({ error: "User not found" });
        }

        console.log("isAuthenticated - User found:", user.email, "Role:", user.role);
        req.user = user;
        next();
    } catch (err) {
        console.error("isAuthenticated middleware error:", err);
        res.status(401).json({ error: "Invalid token" });
    }
}