import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

export const requireAdmin=(req:Request,res:Response,next:NextFunction)=>{
    if(!req.user||req.user.role!=="admin"){
        return res.sendStatus(403);
    }
    next();
}