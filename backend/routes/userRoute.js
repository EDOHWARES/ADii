import express from 'express';
import { registerUser, loginUser, forgotPassword, resetPassword } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/send-reset-link', forgotPassword);
userRouter.post('/reset-password/:token', resetPassword);

export default userRouter;