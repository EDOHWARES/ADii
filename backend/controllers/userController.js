import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import validator from 'validator';

// create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
};

// Register User
const registerUser = async (req, res) => {
    const {email, newPassword, confirmPassword} = req.body;

    try {
        // check if user already exists
        const exist = await userModel.findOne({email});
        if (exist) {
            return res.json({
                success: false,
                message: 'User Already Exists',
            });
        };

        // Validate email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: 'Please Enter A Valid Email',
            });
        };

        // Compare new-password and confirm-password
        if (newPassword !== confirmPassword) {
            return res.json({
                success: false,
                message: 'Passwords Not Match!',
            });
        };

        if (newPassword.length < 8 || confirmPassword.length < 8) {
            return res.json({
                success: false,
                message: 'Please Enter A Strong Password'
            });
        };

        // Hashing(encrypting) user password
        const salt = await bcryptjs.genSalt(11);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        const newUser = new userModel({
            email: email,
            password: hashedPassword,
        });
        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({
            success: true,
            token,
        });


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    };
};

// Login User
const loginUser = async (req, res) => {

};

export {registerUser, loginUser};