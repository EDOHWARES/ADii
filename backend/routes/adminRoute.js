import express from 'express';
import { dashboard, login } from '../controllers/adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Acess granted!',
    });
});

adminRouter.post('/login', login);
adminRouter.get('/dashboard', authMiddleware, dashboard);

export default adminRouter;