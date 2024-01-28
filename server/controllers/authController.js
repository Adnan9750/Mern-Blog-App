import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import { handleError } from "../utils/error.js";

export const SignUp = async (req,res,next)=>{
    try {
        const {username,email,password} = req.body;
        // const userExist = await userModel.findOne({email:email})

        // if(userExist) {
        //     res.status(500).json("Email Already Exists")
        // }

        if(!username || !email || !password || username === '' || email === '' || password === ''){
            next(handleError(400, "All fields are required"))
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new userModel({username,email,password:hashedPassword}); 
        await newUser.save();
        res.json("SignUp Successfully")    
    } catch (error) {
        next(error)
    }
    
}