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
    }
},{timestamps:true});

const userModel = mongoose.model('User',userSchema);

export default userModel