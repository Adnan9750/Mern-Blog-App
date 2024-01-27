import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { connDB } from './db/connDB.js';
const app = express()
const port = process.env.PORT 
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';


// database connection
connDB();

app.use(express.json())

// routes
app.use('/user',userRoutes)
app.use('/auth',authRoutes)

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})