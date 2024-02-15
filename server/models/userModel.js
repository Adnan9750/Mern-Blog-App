import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default: 'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg'
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const userModel = mongoose.model('User',userSchema);

export default userModel

