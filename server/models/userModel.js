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
    profilePhoto:{
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
},{timestamps:true});

const userModel = mongoose.model('User',userSchema);

export default userModel