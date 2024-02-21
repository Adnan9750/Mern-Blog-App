
import express from 'express'
import { userVerification } from '../utils/userVerification.js';
import { createPost } from '../controllers/postController.js';

const router = express.Router();

router.post('/create',userVerification,createPost)

export default router