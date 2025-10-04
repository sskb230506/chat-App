import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const ProtectRoute= async (req,res,next)=>{
    try{
        const token= req.cookies.jwt;
        if(!token) return res.status(401).json({message:"Unauthorized-No token provided"});
        const isValid= jwt.verify(token,process.env.SECRET);
        if(!isValid) return res.status(401).json({message:"Unauthorized-Invalid tokens"});
        console.log(isValid);
        const user = await User.findById(isValid.userid).select("-password");
        if(!user) return res.status(404).json({message:"User not found"});
        req.user=user;
        next();

    }
    catch(error){
        console.log("Error in the protected middleware",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}