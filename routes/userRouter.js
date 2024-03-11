import express from 'express';
import authControllers from "../controllers/authControllers.js";
import { authenticate } from '../middlewares/authenticate.js';

const userRouter = express.Router();

userRouter.patch('/avatars', authenticate, authControllers.updateAvatar);

export default userRouter;