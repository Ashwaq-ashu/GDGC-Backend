// src/helpers/EmailService.js
import nodemailer from 'nodemailer';

class EmailService {
    constructor() {
        // Create transporter once when class is instantiated
        this.transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.BREVO_USER,
                pass: process.env.BREVO_PASS,
            }
        });
    }

    async sendMail(from, to, subject, html) {
        try {
            await this.transporter.sendMail({
                from: from,
                to: to,
                subject: subject,
                html: html
            });
        } catch (error) {
            console.error('Email sending failed:', error);
            throw error;
        }
    }

    // Optional: Add specific email templates as methods
    async sendPasswordReset(email, resetLink) {
        return this.sendMail(
            "GDGC MJCET <gdgc.noreply@gmail.com>",
            email,
            "Reset Your Password",
            `<h1>Hello from the Web Dev Team</h1>
             <p>Click the link below to reset your password (valid for 10 minutes):</p>
             <a href="${resetLink}">Reset Password</a>
             <p>If you didn't request this, please ignore this email.</p>`
        );
    }

    async sendWelcomeEmail(email, password) {
        return this.sendMail(
            "GDGC MJCET <gdgc.noreply@gmail.com>",
            email,
            "Password for GDGC account",
            `<h1>Hello from the Web Dev Team</h1>
             Thank you for Signing up, Here is your password : <b>${password}</b> 
             <br>To keep your account safe, we encourage you on not sharing your password with anyone.  
             <br><br>Best Wishes, <br>Web Dev Team, GDGC MJCET`
        );
    }
}

// Export singleton instance
export default new EmailService();