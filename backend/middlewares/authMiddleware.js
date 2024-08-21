import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {

    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token, 1);

    if (!token) return res.status(401).json({
        success: false,
        message: 'No token provided!',
    });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({
            success: false,
            message: 'Invalid token!',
        });

        res.user = decoded;
        next()
    });
};

export default authMiddleware;