import express from 'express';
import dotenv from 'dotenv';
import { connectdb } from './config/db.js';
dotenv.config();
const app=express();
app.get('/',(req,res)=>{
    res.send("Welcome to the Basic E-commerce API");
})

app.listen(5000, () =>{
    connectdb()
    console.log("Server is running on port 5000");

});

