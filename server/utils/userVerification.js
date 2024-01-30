
import jwt from 'jsonwebtoken'

export const userVerification = (req,res,next) =>{
    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).json('No token! Unauthorized User')
    }

    jwt.verify(token,process.env.SECRET_KEY,(err,user) =>{

        if (err) return res.status(200).json('Unauthorized User')

        req.user = user
        next()
    })
}