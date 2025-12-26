import jwt from 'jsonwebtoken';
import User from '../models/User.js'
export const VerifyToken = () => {
    async (req, res, next) => {
        try {
            let token;

            token = req.cookies.token;
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'No token provided, access denied'
                });
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Get admin from token
            const user = await User.findOne({_id:decoded.id})
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is not valid'
                });
            }
            req.id = user._id;
            next();

        } catch (error) {
            res.status(401).json({
                success: false,
                message: 'Token is not valid',
                error: error.message
            });
        }
    }

}
