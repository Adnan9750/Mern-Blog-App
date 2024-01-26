import userModel from "../models/userModel.js";

export const SignUp = async (req,res)=>{
    const {username,email,password} = req.body;
    const userExist = await userModel.findOne({email:email})

    if(userExist) {
        res.json("Email Already Exists")
    }

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        res.status(400).json({message: "All fields are required"});
    }

    const newUser = new userModel({username,email,password}); 
    await newUser.save();
    res.json("SignUp Successfully")
}