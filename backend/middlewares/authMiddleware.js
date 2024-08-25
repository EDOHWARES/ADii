import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided!',
        });
    }

    // eslint-disable-next-line no-undef
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({
                    success: false,
                    message: 'Token has expired!',
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: `Invalid token! ${err.message}`,
                });
            }
        }

        // If the token is valid and not expired
        req.user = decoded; // Attach the decoded payload to req.user
        next();
    });
};


export default authMiddleware;