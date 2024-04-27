
import express from 'express';
import { AddComment, GetPostComments } from '../controllers/commentController.js';
import { userVerification } from '../utils/userVerification.js';

const router = express.Router();

router.post('/create',userVerification,AddComment)
router.get('/getPostComment/:postId',GetPostComments)

export default router;