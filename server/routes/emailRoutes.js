import express from "express";
import { sendEmail } from "../controller/emailController.js";
const router = express.Router();
router.post("/send-email", sendEmail);
export default router;