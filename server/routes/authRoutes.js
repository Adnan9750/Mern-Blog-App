import express  from "express";
import { GoogleSignIn, SignIn, SignUp } from "../controllers/authController.js";
import { userVerification } from "../utils/userVerification.js";
const router = express.Router()

router.post('/signup',SignUp)
router.post('/signin',SignIn)
router.post('/googleSignIn',GoogleSignIn)

export default router