import express  from "express";
import { GetCommentedUser, deleteUser, getUsers, signOut, updateUser } from "../controllers/userController.js";
import { userVerification } from "../utils/userVerification.js";
const router = express.Router();


router.put('/update/:id',userVerification,updateUser)
router.delete('/deleteuser/:id',userVerification,deleteUser)
router.post('/signout',signOut)
router.get('/getusers',userVerification,getUsers)
// router.delete('/deleteusers',userVerification)

// user who commented on post whose data i get from this api
router.get('/:userID',GetCommentedUser)

export default router