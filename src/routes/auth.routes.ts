import {register,login} from '../controllers/auth.controller.js';
import express,{Router} from 'express';

const authRouter:Router=express.Router();
authRouter.post('/register',register);
authRouter.post('/login',login);

export default authRouter;


