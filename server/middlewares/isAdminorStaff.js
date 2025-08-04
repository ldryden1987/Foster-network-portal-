export default async function isAdminOrStaff(req, res, next) {
    try{
        if (!req.user || !req.user.role) {
            console.log (`Did not use isAuthenticate`);
            throw new Error (`Did not use isAuthenticate`);
        }
        if (req.user.role !== 'staff' && req.user.role !=='admin') {
            return res.json({ error: "Access denied. Administrator privileges required." });
        }
        next(); //continue on to the route handler

    } catch (err) {
        res.json({ error: err });
    }
}