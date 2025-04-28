import express from 'express';
import  authMiddleware  from '../middlewares/authMiddleware.js';
import { LoginUser,RegisterUser } from '../controller/authController.js';
const router = express.Router();

router.post('/login',LoginUser);
router.post('/register',RegisterUser);
export default router;