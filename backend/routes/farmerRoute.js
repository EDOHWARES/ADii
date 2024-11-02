import express from 'express';
import { createFarmer } from '../controllers/farmerController.js';

const farmerRouter = express.Router();

farmerRouter.post('/create', createFarmer);

export default farmerRouter;