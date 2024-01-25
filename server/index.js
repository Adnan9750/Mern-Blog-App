import express from 'express'
import { connDB } from './db/connDB.js';
const app = express()

connDB();


app.listen(8000,()=>{
    console.log("Server is running at port 8000");
})