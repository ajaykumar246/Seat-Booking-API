import express, { Application } from "express";
import authRouter from './routes/auth.routes.js';
const app:Application=express();
app.use(express.json())
app.use('/api/auth',authRouter);
export default app;
