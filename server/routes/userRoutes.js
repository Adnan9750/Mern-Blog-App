import express  from "express";
import { deleteUser, getUsers, signOut, updateUser } from "../controllers/userController.js";
import { userVerification } from "../utils/userVerification.js";
const router = express.Router();


router.put('/update/:id',userVerification,updateUser)
router.delete('/deleteuser/:id',userVerification,deleteUser)
router.post('/signout',signOut)
router.get('/getusers',userVerification,getUsers)
// router.delete('/deleteusers',userVerification)

export default router