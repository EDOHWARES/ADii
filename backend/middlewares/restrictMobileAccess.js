import useragent from 'express-useragent';

const restrictMobile = (req, res, next) => {
    const source = req.headers['user-agent'];
    const ua = useragent.parse(source);

    if (ua.isMobile) {
        return res.status(403).json({
            success: false,
            message: 'Access restricted on mobile devices',
        });
    } else {
        res.status(200).json({
            success: true,
            message: 'Access granted.'
        })
    };

    next();
};

export default restrictMobile;