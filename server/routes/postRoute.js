
import express from 'express'
import { userVerification } from '../utils/userVerification.js';
import { createPost, getPosts } from '../controllers/postController.js';

const router = express.Router();

router.post('/create',userVerification,createPost)
router.get('/getposts',getPosts)

export default router