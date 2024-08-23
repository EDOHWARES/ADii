import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import validator from "validator";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register User
const registerUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    // check if user already exists
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({
        success: false,
        message: "User Already Exists",
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter A Valid Email",
      });
    }

    // Compare new-password and confirm-password
    if (password != confirmPassword) {
      return res.json({
        success: false,
        message: "Passwords Do Not Match!",
      });
    }

    if (password.length < 8 || confirmPassword.length < 8) {
      return res.json({
        success: false,
        message: "Please Enter A Strong Password",
      });
    }

    // Hashing(encrypting) user password
    const salt = await bcryptjs.genSalt(11);
    const hashedPassword = await bcryptjs.hash(password, salt);

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
      message: "Server Error",
      error: error.message,
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.json({
        success: false,
        message: "User Does Not Exist!",
      });
    }

    // Check if password matches any in the db
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Handle User Forgot Password - send recovery mail
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: 'Invalid Email, Pls Enter a Valid One!',
      })
    };

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "No User Found With The Provided Email",
      });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set the reset token and expiration on the user
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 3600000;
    await user.save({ validateBeforeSave: false });

    // Create the reset URL
    const resetURL = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`;

    // Set up nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "adiinsightnigeria@gmail.com",
        pass: "fnzv mizt hhwy znst",
      },
    });

    // Email Email Template
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #276100;
                text-align: center;
            }
            p {
                font-size: 16px;
                line-height: 1.5;
            }
            .button {
                display: block;
                width: 100%;
                text-align: center;
                margin: 20px 0;
            }
            .button a {
                background-color: #276100;
                color: #fff;
                padding: 15px 20px;
                text-decoration: none;
                border-radius: 5px;
                font-size: 18px;
                display: inline-block;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 14px;
                color: #777;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>Password Reset Request</h1>
            <p>Hello,</p>
            <p>We received a request to reset your password. Click the button below to reset your password:</p>
            <div class="button">
                <a href="${resetURL}" target="_blank">Reset Password</a>
            </div>
            <p>If you did not request this password reset, please ignore this email. This link will expire in one hour.</p>
            <p>Thank you,<br>The Team</p>
        </div>
        <div class="footer">
            <p>If you have any questions, feel free to <a href="mailto:adiinsightnigeria@gmail.com">contact us</a>.</p>
        </div>
    </body>
    </html>
    `;

    const mailOptions = {
      from: "ADiInsightNigeria <adiinsightnigeria@gmail.com>",
      to: user.email,
      subject: "Passwowrd Reset",
      html: htmlTemplate,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "High",
      },
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Handle Password Reset - update user password in db
const resetPassword = async (req, res) => {
    try {
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const email = req.body.email
        const u = await userModel.findOne({email});

        if (!u) {
          return res.json({
            success: false,
            message: 'Pls use the correct Email!'
          });
        };

        const user = await userModel.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: {$gt: Date.now()},
        });

        if (!user) {
            return res.json({
                success: false,
                message: 'Token Is Invalid Or Has Expiered',
            });
        };

        // Has password
        const salt = await bcryptjs.genSalt(11);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);

        // Update the password
        user.password = hashedPassword;
        user.passwordResetExpires = undefined;
        user.passwordResetToken = undefined;

        await user.save();

        res.json({
            success: true,
            message: 'Password Has Been Reset, Go Back And Login!',
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

export { registerUser, loginUser, forgotPassword, resetPassword };
