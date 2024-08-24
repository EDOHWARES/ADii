import express from 'express';
import { clearAllCommodities, dashboard, deleteCommodity, login, updateCommodity } from '../controllers/adminController.js';
import authMiddleWare from '../middlewares/authMiddleware.js'

const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Acess granted!',
    });
});

adminRouter.post('/login', login);
adminRouter.get('/dashboard', authMiddleWare, dashboard);
adminRouter.post('/delete-commodity', authMiddleWare, deleteCommodity)
adminRouter.post('/clear-commodity', authMiddleWare, clearAllCommodities);
adminRouter.post('/update', authMiddleWare, updateCommodity);

export default adminRouter;