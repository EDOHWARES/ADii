import express from 'express';
import { createFarmer, getAllFarmers, getFarmerById, updateFarmerById, deleteAFarmer } from '../controllers/farmerController.js';

const farmerRouter = express.Router();

farmerRouter.post('/', createFarmer);
farmerRouter.get('/', getAllFarmers);
farmerRouter.get('/:id', getFarmerById),
farmerRouter.put('/:id', updateFarmerById);
farmerRouter.delete('/:id', deleteAFarmer);

export default farmerRouter;