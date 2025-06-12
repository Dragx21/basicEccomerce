import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { connectdb } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();
app.use(express.json());



connectdb().then(() => {
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
}).catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
});
