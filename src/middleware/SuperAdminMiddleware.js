import User from "../models/User.js";
const SuperAdminMiddleware = async (req, res, next) => {
    try {
        const user = await User.findById(req.id);
        if (!user.superadmin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default SuperAdminMiddleware;