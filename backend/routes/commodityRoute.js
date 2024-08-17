import express from 'express';
import { clearAllCommodities, deleteCommodity, getAllCommodities, upsertCommodity } from '../controllers/commodityController.js';

const commodityRouter = express.Router();

commodityRouter.get('/fetch', getAllCommodities);
commodityRouter.post('/upsert', upsertCommodity);
commodityRouter.post('/clear', clearAllCommodities);
commodityRouter.post('/delete', deleteCommodity);

export default commodityRouter;