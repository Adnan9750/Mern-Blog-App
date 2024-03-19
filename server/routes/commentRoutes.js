
import express from 'express';
import { AddComment } from '../controllers/commentController.js';
import { userVerification } from '../utils/userVerification.js';

const router = express.Router();

router.post('/create',userVerification,AddComment)

export default router;