import express from 'express';
import { login } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Acess granted!',
    });
});

adminRouter.post('/login', login);

export default adminRouter;