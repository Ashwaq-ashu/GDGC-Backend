import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Qr from '../models/qrmodel.js';
import {nanoid } from 'nanoid';
import nodemailer from 'nodemailer';
const SMTP_KEY = process.env.SMTP_KEY;
const SMTP_USER = process.env.SMTP_USER;
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user:  `${SMTP_USER}`,
    pass:  `${SMTP_KEY}`,
  },
});


export const AuthController = {
    Register: async (req , res) => {
        try {
            const {name , email , password} = req.body;
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
    CreateUserFromEmail : async (req , res) => {
        try {
                
            const {name, email , id} = req.body();

            // is the id valid ?? does an acc already exits with this id ?? 
            // ==> qr model mein check if there exists an id => id is valid 
            const existingId = await Qr.findOne({id});
            if(existingId){
                const existingUserEmail = await Qr.findOne({email});
                if(!existingUserEmail){
                    const password = nanoid();
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(password, salt);
                    (async () => {
                        try{
                            const info = await transporter.sendMail({
                            from: '"Web Dev Team" <160423747081>',
                            to: email,
                            subject: "Password for GDGC account",
                            text: `Hello from the Web Dev Team, \n Thank you for Signing up, Here is your pass,word : ${password} \n Please don't sh are your password to keep your account safe. \n\n Best Wishes, \n Web Dev Team, GDGC MJCET`
                        });

                        console.log("Message sent:", info.messageId);
                    }
                        catch(e){
                            console.log("Error sending email:", e)
                        }
                        })();
                                            
                    const User = new User({
                        name, 
                        email,
                        password : hash,
                        qr_id: id
                    })
                    await User.save()
                }
                else {
                return res.status(401).json({
                    success: false,
                    message: 'Email Already Exists'
                });
            }
            }
            else{
                return res.status(401).json({
                    success:false,
                    message: 'ID Doesnt Exists'
                })
            }
            // ==> now check any user model if an user already exist with this id => already taken => error : go ahead 
            // generate a new password 
            // hash the new password and put in db 
            // create a account for them by adding the hashed password , email , id in it 
            // send the password and you are invited mail to the email use postmarker 
            // u dont need to send a token 
        } catch (error) {
            res.status(500).json({
                success : false ,
                message : "Something went wrong" + error
            })
        }
    }
}
