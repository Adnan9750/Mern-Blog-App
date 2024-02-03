import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import { handleError } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const SignIn = async (req, res,next) => {
    const {email,password} = req.body;
    if(!email || !password || email === '' || password === '') {
        return res.status(400).json('All fields are required')
    }
    try {
        const userExist = await userModel.findOne({email:email})
    
        if(userExist){
    
            const matchPassword = await bcrypt.compare(password,userExist.password)
    
            if(userExist.email === email && matchPassword){
    
                const jwttoken = jwt.sign({userId:userExist._id},process.env.SECRET_KEY)
                const {password,...rest} = userExist._doc;
    
                res
                .cookie('access_token',jwttoken,{ httpOnly: true, secure: false , SameSite: 'None'})
                .status(200)
                .json({"status":"success","message":"Login Successfully","userData":rest,"token":jwttoken})
    
            }else{
                return res.json({"status":"failed","message":'Invalid Credentials'})
            }
        }else{
            return res.json({"status":"failed","message":'User Not Found'})
        } 
    } catch (error) {
        next(error)
    }
    
}

export const GoogleSignIn = async (req,res,next) => {
    try {
        const userExist = await userModel.findOne({email:req.body.email})
        if(userExist) {
            const jwttoken = jwt.sign({userId:userExist._id}, process.env.SECRET_KEY)
            const {password:password, ...rest} = userExist._doc
            res
                .cookie('access_token',jwttoken,{httpOnly:true,secure: false})
                .status(200)
                .json({"userData":rest,"token":jwttoken})
        }else {
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(generatePassword,10)
            const newUser = await userModel({
                username: req.body.username.split(' ').join('').toLowerCase() + Math.random().toString(9).slice(-4),
                email : req.body.email,
                password : hashedPassword,
                profilePhoto : req.body.profilePhoto
            })
            await newUser.save()

            const jwttoken = jwt.sign({userId : userExist._id},process.env.SECRET_KEY)
            const {password , ...rest} = userExist._doc
            res
                .cookie('access_token',jwttoken,{httpOnly:true,secure: false})
                .status(200)
                .json({"userData":rest,"token":jwttoken})

        }
    } catch (error) {
        next(error)
    }
}