import emailModel from "../models/emailModel.js";
import validator from "validator";

const saveEmail = async (req, res) => {
    try {
        const email = req.body.email;

        // check if email exist in req body
        if (!email) {
            return res.json({
                success: false,
                message: "Email can't be empty"
            });
        };

        // checking if email already exists
        const exists = await emailModel.findOne({email});
        if (exists) {
            return res.json({
                success: false,
                message: 'Email already exists'
            });
        };

        // check if email is valid
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: 'Please enter a valid email'
            });
        };

        // save the email
        const newEmail = new emailModel({email});
        await newEmail.save();
        res.json({
            success: true,
            message: 'Email successfully saved'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    };

};

export default saveEmail;