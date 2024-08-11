import express from 'express';
import saveEmail from '../controllers/emailController.js';

const emailRouter = express.Router();

emailRouter.post('/save', saveEmail);

export default emailRouter;