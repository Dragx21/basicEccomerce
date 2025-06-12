import express from "express";
const router=express.router;
export default router;
router.get('/api/products',async (req,res)=> {
    try {
        const products=await Product.find({})
        res.status(200).json({success:true,data:products});
    } catch (error) {
        console.log("cannot fetch products",error.message)
        res.status(500).json({success:false,message:"Server error"});
    }

})

router.post('/api/products', async (req, res) => {
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
router.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    console.log("id", id);
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product deleted"});
    } catch (error) {
        res.status(404).json({success:false,message:"No product found"})
        
    }
});
router.put("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});