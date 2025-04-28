import express from 'express'
import generateSummaryController from '../controller/summaryController.js';
import upload from '../middlewares/multer.middleware.js'
const router = express.Router()

router.post('/upload-file', upload.single('file'), generateSummaryController);
export default router