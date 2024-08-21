import detect from 'mobile-detect';

const restrictMobile = (req, res, next) => {
    const md = new detect(req.headers['user-agent']);

    if (md.mobile()) {
        return res.status(403).json({
            success: false,
            message: 'Access restricted on mobile devices',
        });
    };

    next();
};

export default restrictMobile;