import {registerUser,loginUser} from '../services/auth.service.js'
import { Request, Response } from "express";
export async function register(req:Request, res:Response) {
  try{
    const {name,email,password,role}=req.body;
    await registerUser(name,email,password,role);
    res.status(201).json({message:"User Registered Successfully!!"});
  }
  catch(err) {
  if(err instanceof Error && err.message === "User already exists") {
    return res.status(409).json({ message: err.message })
  }
  res.status(500).json({ message: "Internal server error" })
}
}

export async function login(req:Request,res:Response) {
    try{
        console.log("login");
        const {email,password} =req.body;
        const {accessToken,refreshToken}=await loginUser(email,password);
        res.status(200)
        .cookie('refresh', refreshToken, {
            httpOnly: true,   // JS cannot access this cookie
            secure: false,     // only sent over HTTPS
            sameSite: 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path:"/api/auth/refresh"
        })
        .json({accessToken: accessToken,message:"Login Successfull"});
    }
    catch(err){
        if(err instanceof Error && err.message === "User not found") {
    return res.status(404).json({ message: err.message })
  }
   if(err instanceof Error && err.message === "Invalid password") {
    return res.status(401).json({ message: err.message })
  }
  res.status(500).json({ message: "Internal server error" })
    }
    
}