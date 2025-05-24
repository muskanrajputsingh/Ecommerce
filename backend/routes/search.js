const {Product} = require('../models/products.js');
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

// router.get('/',async(req,res)=>{
//     try{
//         const query = req.query.q;
//         if(!query){
//             return res.status(400).json({msg:'query is required'});
//         }

//         const items=await Product.find({
//             $or:[
//                 {name:{$regex:query,$options:'i'} },
//                 {brand:{$regex:query,$options:'i'} },
//                 {catName:{$regex:query,$options:'i'} }
//             ]
//         });
//         res.json(items);
//     }catch(err){
//         res.status(500).json({msg:'server error'});
//     }
// })

router.get('/', async (req, res) => {
    try {
      const query = req.query.q;
      if (!query) {
        return res.status(400).json({ msg: 'query is required' });
      }
  
      const items = await Product.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { brand: { $regex: query, $options: 'i' } },
          { catName: { $regex: query, $options: 'i' } },
          { "subCategory.subCat": { $regex: query, $options: 'i' } }  // added subcategory search
        ]
      });
  
      res.json(items);
    } catch (err) {
      res.status(500).json({ msg: 'server error' });
    }
  });
  

module.exports = router;