import express from 'express';
import dotenv from 'dotenv';
import { connectdb } from './config/db.js';
dotenv.config();
const app=express();
app.post('/products',async (req,res)=>{
    const product=req.body;
    if(!product.name ||!product.price ||!product.image){
        return res.status(400).json({success:false,message:"Please give all fields"});
    }
    const newProduct= new Product(product)
    try {
        await newProduct.save();
        res.status(201).json({success:true,data:newProduct});
    } catch (error) {
        console.error("Error in product creation",error.message);
        res.status(500).json({success:false,message:"Server Error"})
        
    }
});

app.listen(5000, () =>{
    connectdb()
    console.log("Server is running on port 5000");

});

