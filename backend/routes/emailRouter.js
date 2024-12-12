import express from 'express';
import {saveEmail, fetchNewsletterSubscribers} from '../controllers/emailController.js';

const emailRouter = express.Router();

emailRouter.post('/save', saveEmail);
emailRouter.get('/', fetchNewsletterSubscribers);

export default emailRouter;