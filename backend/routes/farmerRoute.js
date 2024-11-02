import express from 'express';
import { createFarmer, getAllFarmers } from '../controllers/farmerController.js';

const farmerRouter = express.Router();

farmerRouter.post('/create', createFarmer);
farmerRouter.get('/allFarmers', getAllFarmers);

export default farmerRouter;