import User from "../models/User.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { generateToken } from "../../lib/utlis.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
export const signup = async (req,res) => {
    try{

    
    const { fullName, email, password } = req.body;
    if(!fullName || !email || !password){
        return res.status(400).json("All fields are required");
    }
   
    if(password.length <6){
        return res.status(400).json("Minimum password length should be 6");
    }
    if(!validator.isEmail(email)){
        return res.status(400).json("Invalid email address");
    }
    const user =await User.findOne({email});
    if(user){
        return res.json("User with current email already exists");
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPass=await bcrypt.hash(password,salt);
    const newUser= new User({
        fullName,
        email,
        password:hashedPass

    })
    if(newUser){
        await newUser.save();
        generateToken(newUser._id,res);
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilePic
        })
        try{
            await sendWelcomeEmail(newUser.email,newUser.fullName,process.env.CLIENT_URL);
        }
        catch(error){
            console.log("failed to send email",error);
        }
    }
    else{
        return res.status(404).json({message:"Invalid user data"});
    }
}
catch(err){
    console.log(err);
    res.status(500).json("Internal server error");
}

}