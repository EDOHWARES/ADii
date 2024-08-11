import express from 'express';
import { fetchCommodityList, upsertCommodity } from '../controllers/commodityController.js';

const commodityRouter = express.Router();

commodityRouter.get('/fetch', fetchCommodityList);
commodityRouter.post('/upsert', upsertCommodity);

export default commodityRouter;