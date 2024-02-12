import express  from "express";
import { deleteUser, updateUser } from "../controllers/userController.js";
import { userVerification } from "../utils/userVerification.js";
const router = express.Router();


router.put('/update/:id',userVerification,updateUser)
router.delete('/delete/:id',userVerification,deleteUser)

export default router