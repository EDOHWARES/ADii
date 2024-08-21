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

const dashboard = async (req, res) => {
    res.json({
        success: true,
        dashboard: 'dashboard',
    })
};

// Delete Commodity
const deleteCommodity = async (req, res) => {
    try {
        const {name} = req.body;
        let deletedCommodity = await commodityModel.findOneAndDelete({name});

        if (deletedCommodity) {
            return res.json({
                success: true,
                message: 'Commodity Deleted Successfully',
            });
        } else {
            return res.json({
                success: false,
                message: 'Commodity Not Found!'
            });
        };
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    };
};

// Clear All Commodity
const clearAllCommodities = async (req, res) => {
    const result = await commodityModel.deleteMany({});

    if (result) {
        res.json({
            success: true,
            message: 'All Commodities Cleared!'
        });
    };
};

export { login, dashboard, clearAllCommodities, deleteCommodity };
