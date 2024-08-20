import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import adminModel from '../models/adminModel.js';

const login = async (req, res) => {

    try {
        const { username, password } = req.body;

        // Find the admin by username
        const admin = await adminModel.findOne({ username });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials - username not found'
            });
        };

        // Compare the provided password with the hashed and stored one
        const isMatch = await bcryptjs.compare(password, admin.password);
        console.log(password);
        console.log(admin.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials - wrong secret key',
            });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the response with the token
        return res.json({
            success: true,
            message: 'Access granted!',
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

export { login };
