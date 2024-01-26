import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { connDB } from './db/connDB.js';
const app = express()
const port = process.env.PORT 

connDB();


app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})