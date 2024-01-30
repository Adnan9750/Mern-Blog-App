import express  from "express";
import { SignIn, SignUp } from "../controllers/authController.js";
import { userVerification } from "../utils/userVerification.js";
const router = express.Router()

router.post('/signup',SignUp)
router.post('/signin',SignIn)

export default router