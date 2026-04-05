import { NextFunction, Request, Response } from "express";
import {verifyToken} from '../utils/jwt.js';
import { JwtPayload } from "jsonwebtoken";

export const requireAuth=(req:Request,res:Response,next:NextFunction)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(" ")[1];
    if(!token) return res.sendStatus(401);

    try{
        const payload:JwtPayload=verifyToken(token);
        req.user=payload;
        next();
    }
    catch(err){
        res.sendStatus(401);
    }
    
}