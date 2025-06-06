const express = require('express');
const router = express.Router();
const { Product } = require('../models/products');
const { Category } = require('../models/category');
const { subCategory } = require("../models/subCat");

// ✅ GET Products with Filtering & Pagination
router.get('/product', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 4;
        const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : 0;
        const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : Infinity;
        
        let filter = {};

        if (req.query.catName) {
            filter.catName = req.query.catName;
        }
        if (req.query.subCatId) {
            filter.subCatId = req.query.subCatId;
        }
        if (req.query.brand) {
            filter.brand = { $regex: new RegExp(req.query.brand, "i") }; // Case-insensitive search
        }

        // Apply price range filter
        filter.price = { $gte: minPrice, $lte: maxPrice };

        // Get total count after applying filters
        const totalPosts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalPosts / perPage);

        if (totalPages > 0 && page > totalPages) {
            return res.status(404).json({ message: "Page not found" });
        }

        // Query filtered products with pagination
        const productList = await Product.find(filter)
            .populate("category")
            .populate("subCat")
            .skip((page - 1) * perPage)
            .limit(perPage);

        if (!productList.length) {
            return res.status(404).json({ success: false, message: "No products found" });
        }

        return res.status(200).json({
            products: productList,
            totalPages: totalPages,
            page: page
        });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: err.message, success: false });
    }
});

// ✅ GET Featured Products
router.get('/featured', async (req, res) => {
    try {
        const productList = await Product.find({ isFeatured: true });

        return res.status(200).json({ products: productList });
    } catch (err) {
        console.error("Error fetching featured products:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ✅ POST New Product
router.post('/product', async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);
        if (!category) {
            return res.status(404).send("Invalid Category!");
        }

        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            oldPrice: req.body.oldPrice,
            catName: req.body.catName,
            subCatId: req.body.subCatId,
            category: req.body.category,
            subCat: req.body.subCat,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            isFeatured: req.body.isFeatured,
            size: req.body.size,
            discount: req.body.discount
        });

        product = await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: err.message, success: false });
    }
});

// ✅ DELETE Product by ID
router.delete('/product/:id', async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deleteProduct) {
            return res.status(404).json({ message: "Product not found", status: false });
        }
        res.status(200).json({ message: "Product deleted successfully", status: true });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ error: err.message, success: false });
    }
});

// ✅ GET Product by ID
router.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category").populate("subCat");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ error: err.message, success: false });
    }
});

// ✅ UPDATE Product by ID
router.put("/product/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                images: req.body.images,
                brand: req.body.brand,
                price: req.body.price,
                oldPrice: req.body.oldPrice,
                catName: req.body.catName,
                subCatId: req.body.subCatId,
                category: req.body.category,
                subCat: req.body.subCat,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                isFeatured: req.body.isFeatured,
                size: req.body.size,
                discount: req.body.discount
            },
            { new: true }
        ).populate("category").populate("subCat");

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ error: err.message, success: false });
    }
});

module.exports = router;
