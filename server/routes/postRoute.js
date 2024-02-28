
import express from 'express'
import { userVerification } from '../utils/userVerification.js';
import { createPost, deletePost, getPosts } from '../controllers/postController.js';

const router = express.Router();

router.post('/create',userVerification,createPost)
router.get('/getposts',getPosts)
router.delete('/deletepost/:postID/:userID',userVerification,deletePost)

export default router