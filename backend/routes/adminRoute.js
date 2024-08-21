import express from 'express';
import { clearAllCommodities, dashboard, deleteCommodity, login } from '../controllers/adminController.js';
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
adminRouter.post('/delete-commodity', authMiddleware, deleteCommodity)
adminRouter.post('/clear-commodity', authMiddleware, clearAllCommodities);

export default adminRouter;