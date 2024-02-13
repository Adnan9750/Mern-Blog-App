import express  from "express";
import { deleteUser, signOut, updateUser } from "../controllers/userController.js";
import { userVerification } from "../utils/userVerification.js";
const router = express.Router();


router.put('/update/:id',userVerification,updateUser)
router.delete('/delete/:id',userVerification,deleteUser)
router.post('/signout',signOut)

export default router