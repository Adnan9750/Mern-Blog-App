import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'

export const SignUp = async (req,res)=>{
    try {
        const {username,email,password} = req.body;
        // const userExist = await userModel.findOne({email:email})

        // if(userExist) {
        //     res.json({message:"Email Already Exists"})
        // }

        if(!username || !email || !password || username === '' || email === '' || password === ''){
            res.status(400).json({message: "All fields are required"});
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new userModel({username,email,password:hashedPassword}); 
        await newUser.save();
        res.json("SignUp Successfully")    
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
}