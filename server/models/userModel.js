import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    },
    avatar:{
        type: 'string',
        default: 'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg'
    }
},{timestamps:true});

const userModel = mongoose.model('User',userSchema);

export default userModel

