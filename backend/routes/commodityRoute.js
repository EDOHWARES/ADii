import express from 'express';
import { getAllCommodities } from '../controllers/commodityController.js';

const commodityRouter = express.Router();

commodityRouter.get('/fetch', getAllCommodities);

export default commodityRouter;