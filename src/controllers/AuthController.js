import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};
export const AuthController = {
    Register: async (req , res) => {
        try {
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'User already exists with this email'
                });
            }
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create new admin
            const newAdmin = new User({
                name,
                email,
                password: hashedPassword
            });

            await newAdmin.save();

            // Generate token
            const token = generateToken(newAdmin._id);

            // Remove password from response
            const adminResponse = {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email
            };

            res.status(201).json({
                success: true,
                message: 'Admin registered successfully',
                token,
                admin: adminResponse
            });
        }
        catch(e){
            res.status(500).json({
                success: false,
                message: 'Server error during login',
                error: e.message
            });
        }
    } ,
    LoginAdmin : async (req , res, next) => {
         try {
            const { email, password } = req.body;

            // Check if email and password are provided
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide email and password'
                });
            }

            // Find admin by email
            const admin = await User.findOne({ email });
            if (!admin) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            // Check password
            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            // Generate token
            const token = generateToken(admin._id);

            // Admin response without password
            const adminResponse = {
                id: admin._id,
                name: admin.name,
                email: admin.email
            };

            res.status(200).json({
                success: true,
                message: 'Admin login successful',
                token,
                admin: adminResponse
            });
            next();

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Server error during login',
                error: error.message
            });
        }
    },
}