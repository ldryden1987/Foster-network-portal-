import jwt from 'jsonwebtoken';
import User from '../models/User.js'

//next works like return, but lets it go forward
export default async function isAuthenticated(req, res, next) {
    try {
        //goes to headers in the authorization field
        const sessionToken = req.headers.authorization;
        if (!sessionToken) {
            return res.json ({ error: "Authentication token missing. Please sign in to continue." })
        }
        //decodes the _id
        const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET);
        //finds the user in the db
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.json({ error: "User not found. Invalid or expired token." })
        }
        req.user = user;
        return next();
    }catch(err) {
        res.json({ error: err})
    }
}