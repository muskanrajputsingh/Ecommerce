const {Cart} = require('../models/cart');
const express = require('express');
const router  = express.Router();

router.get('/',async(req,res)=>{
    try{
        const cartList = await Cart.find(req.query);

        if(!cartList){
            res.status(500).json({sucess:false})
        }
        return res.status(200).json(cartList);
    }catch(error){
        res.status(500).json({sucess:false})
    }
})

// router.post('/add',async(req,res)=>{

//   const cartItem = await Cart.find({productId:req.body.productId});

//   if(!cartItem){
//     let cartList=new Cart({
//         productTitle:req.body.productTitle,
//         image:req.body.image,
//         rating:req.body.rating,
//         price:req.body.price,
//         quantity:req.body.quantity,
//         subTotal:req.body.subTotal,
//         productId:req.body.productId,
//         userId:req.body.userId,
//     })
//   if(!cartList){
//     res.status(500).json({
//         error:err,
//         sucess:false
//     })
//   }
//   cartList = await cartList.save();
//   res.status(201).json(cartList);
// }else{
//     res.status(401).json({status:false,msg:"Product already added in the cart"})
//   }
// });

router.post('/add', async (req, res) => {
    try {
      const cartItem = await Cart.findOne({ productId: req.body.productId, userId: req.body.userId });
  
      if (cartItem) {
        return res.status(401).json({ status: false, msg: "Product already added in the cart" });
      }
  
      let cartList = new Cart({
        productTitle: req.body.productTitle,
        image: req.body.image,
        rating: req.body.rating,
        price: req.body.price,
        quantity: req.body.quantity,
        subTotal: req.body.subTotal,
        productId: req.body.productId,
        userId: req.body.userId,
      });
  
      await cartList.save();
      res.status(201).json({ status: true, msg: "Item added to cart", cartItem: cartList });
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: error.message, success: false });
    }
  });
  

router.delete('/:id',async(req,res)=>{
    const deletedItem = await Cart.findByIdAndDelete(req.params.id);
    if(!deletedItem){
        res.status(404).json({
            message:'Cart item not found',
            sucess:false
        })
    }

    res.status(200).json({
        sucess:true,
        message:'Cart Item Deleted'
    })
})

// router.put('/:id',async(req,res)=>{
//     const cartList=new Cart({
//         productTitle:req.body.productTitle,
//         image:req.body.image,
//         rating:req.body.rating,
//         price:req.body.price,
//         quantity:req.body.quantity,
//         subTotal:req.body.subTotal,
//         productId:req.body.productId,
//         userId:req.body.userId,
//     },{new:true}
// )
//   if(!cartList){
//     return res.status(500).json({
//         message:'cart item cannot be updated',
//         error:err,
//         sucess:false
//     })
//   }
//   res.send(cartList);
// })

router.put("/:id", async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          productTitle: req.body.productTitle,
          image: req.body.image,
          rating: req.body.rating,
          price: req.body.price,
          quantity: req.body.quantity,
          subTotal: req.body.subTotal,
          productId: req.body.productId,
          userId: req.body.userId,
        },
        { new: true } // ✅ Ensures the updated document is returned
      );
  
      if (!updatedCart) {
        return res.status(404).json({
          message: "Cart item not found",
          success: false,
        });
      }
  
      res.json(updatedCart); // ✅ Return updated cart item
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({
        message: "Cart item cannot be updated",
        error: error.message,
        success: false,
      });
    }
  });

module.exports=router;