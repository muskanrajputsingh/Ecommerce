const express = require('express')
const mongoose = require("mongoose");
const {Category} = require('../models/category');
const router = express.Router();

// router.get('/category',async(req,res)=>{

// //pagination
// try{
//     const page = parseInt(req.query.page) || 1;
//     const perPage = 6;
//     const totalPosts = await Category.countDocuments();
//     const totalPages = Math.ceil(totalPosts/perPage);
//     if(page>totalPages){
//         return res.status(404).json({message:"page not found"});
//     }
    
//     //get

//     const categoryList = await Category.find()
//     .skip((page-1)*perPage)
//     .limit(perPage)
//     .exec();

//     //  const categoryList = await Category.find();
//      if(!categoryList || categoryList.length === 0){
//         res.status(500).json({success:false})
//      }
//     //   res.send(categoryList);
//     return res.status(200).json({
//         "categoryList":categoryList,
//         "totalPages":totalPages,
//         "page":page
//     })
//     }
//     catch(error){
//         console.log("error in fetching category data:",error);
//     }
// }) 

router.get('/category', async (req, res) => {
    try {
        const getAll = req.query.all === "true"; // If ?all=true, fetch all

        if (getAll) {
            const categoryList = await Category.find();
            return res.status(200).json({ success: true, categoryList, totalCategories: categoryList.length });
        }

        // Pagination logic
        const page = parseInt(req.query.page) || 1;
        const perPage = 5;
        const totalPosts = await Category.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return res.status(404).json({ message: "Page not found" });
        }

        const categoryList = await Category.find()
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        return res.status(200).json({
            success: true,
            categoryList,
            totalPages,
            page
        });
    } catch (error) {
        console.log("Error in fetching category data:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});


router.get("/category/:id", async (req, res) => {
    const id = req.params.id;
    const p = await Category.find({ "_id": id })
    res.send(p);
});

// router.put("/category/:id", async (req, res) => {
//     const id = req.params.id;
//     const data = req.body;
//     const p = await Category.updateOne({ "_id": id }, data);
//     res.send(p);
// })

router.put("/category/:id", async (req, res) => {
    const { id } = req.params;
    
    // Check if id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid category ID" });
    }

    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.json(updatedCategory);
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/category/:id", async (req, res) => {
    const id = req.params.id;
    const p = await Category.findOne({ "_id": id })
    const d = await Category.deleteOne(p)
    res.send(d);
})
router.post("/category", async (req, res) => {
    const p = new Category({
        name : req.body.name,
        images : req.body.images,
        })
    await p.save();
    res.send(p);
})



module.exports=router;
