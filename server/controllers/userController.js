import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';

export const updateUser = async (req,res)=> {
    if(req.user.userId !== req.params.id) {
        return res.status(401).json('Unauthorized access can only update your own account')
    }
        if(req.body.password){
            if(req.body.password.lenght > 6){
                return res.status(400).json('Password must be atleast 6 characters')
            }
            req.body.password = await bcrypt.hash(req.body.password,10)
        }
        // if(req.body.username){
        //     if(req.body.username.lenght < 7 || req.body.username.lenght > 20){
        //         return res.status(400).json('Username must be between 7 and 20 characters')
        //     }
        //     if(req.body.username.includes(' ')){
        //         return res.status(400).json('Username cannot contain spaces')
        //     }
        //     if(req.body.username.match(/^[a-zA-Z0-9]+$/)){
        //         return res.status(400).json('Username only contain letters and numbers')
        //     }
        // }
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        },{new:true});
        const {password,...rest} = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        res.json({'message':error})
    }
}

export const deleteUser = async (req,res) => {

    if(req.user.userId !== req.params.id) {
        return res.status(401).json('Unauthorized access can only delete your own account')
    }

    await userModel.findByIdAndDelete({_id:req.params.id})

    res.clearCookie('access_token',{httpOnly:true,secure:false})
    res.status(200).json('User has been Deleted')
}

export const signOut = async (req,res) => {
    
    res.clearCookie('access_token',{httpOnly:true,secure:false}).status(200).json("User has been signed out")

}

export const getUsers = async (req, res,next) => {
    if(!req.user.isAdmin){
        return res.status(403).json('You have no permissions to see all users')
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const orderDirection = req.query.order === 'asc' ? 1 : -1;

        const users = await userModel.find().sort({createdAt:orderDirection}).skip(startIndex).limit(limit)

        const getUserWithoutPassword = users.map((user) => {
            const {password,...rest} = user._doc;
            return rest 
        })

        const totalUsers = await userModel.countDocuments();

        const dateNow = new Date()

        const lastMonth = new Date(
            dateNow.getFullYear(),
            dateNow.getMonth() - 1,
            dateNow.getDate()
        )

        const lastMonthUsers = await userModel.countDocuments({
            createdAt: {$gte: lastMonth}
        });

        res.status(200).json({
            users:getUserWithoutPassword,
            totalUsers,
            lastMonthUsers
        })

    } catch (error) {
        next(error)
    }
}