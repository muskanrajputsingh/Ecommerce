const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    productTitle:{
     type:String,
     required:true
    },
    image: {
            type:String,
            required:true
        },
    rating:{
        type:Number,
        required:true
    }, 
    price:{
        type:Number,
        required:true
    }, 
    quantity:{
        type:Number,
        required:true
    }, 
    subTotal:{
        type:Number,
        required:true
    }, 
    productId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})
// ✅ Fix: Ensure `_id` exists before calling `toHexString()`
cartSchema.virtual("id").get(function () {
    return this._id ? this._id.toHexString() : null;
  });
  
  // ✅ Ensure virtuals are included in JSON responses
  cartSchema.set("toJSON", { virtuals: true });

exports.Cart = mongoose.model('Cart',cartSchema);
exports.cartSchema = cartSchema;
