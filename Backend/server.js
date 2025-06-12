import express from 'express';
import dotenv from 'dotenv';
import { connectdb } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/api/products', async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please give all fields"
        });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({
            success: true,
            data: newProduct
        });
    } catch (error) {
        console.error("Error in product creation:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

// ✅ Fixed DELETE route
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    console.log("id", id);
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product deleted"});
    } catch (error) {
        res.status(404).json({success:false,message:"No product found"})
        
    }
});

connectdb().then(() => {
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
}).catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
});
