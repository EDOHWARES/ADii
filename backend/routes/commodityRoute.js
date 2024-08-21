import express from 'express';
import { getAllCommodities, upsertCommodity } from '../controllers/commodityController.js';

const commodityRouter = express.Router();

commodityRouter.get('/fetch', getAllCommodities);
commodityRouter.post('/upsert', upsertCommodity);

export default commodityRouter;