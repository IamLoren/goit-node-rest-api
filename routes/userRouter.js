import express from 'express';
import authControllers from "../controllers/authControllers.js";
import { authenticate } from '../middlewares/authenticate.js';
import upload from "../middlewares/upload.js";

const userRouter = express.Router();

userRouter.patch('/avatars', authenticate, upload.single("avatar"), authControllers.updateAvatar);
export default userRouter;