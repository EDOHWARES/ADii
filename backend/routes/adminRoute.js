import express from 'express';

const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    console.log('passed middleware')
});

export default adminRouter;