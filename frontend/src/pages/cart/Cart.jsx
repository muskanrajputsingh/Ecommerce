import React, { useContext, useEffect, useState } from "react";
import './Cart.css';
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Qunatity from "../../components/qunatityBox/Qunatity";
import { MyContext } from "../../App";
import { FaShoppingCart } from "react-icons/fa";
import { deleteData, editData, fetchDataFromApi } from "../../utils/api";

const Cart = () => {
  const [cartData, setCartData] = useState([]); 
  const [productQuantity, setProductQuantity] = useState();
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
   const [changeQuantity,setChangeQuantity] = useState(0);
   const [selectedQunatity,setSelectedQuantity]=useState();

  useEffect(() => {
    fetchDataFromApi('/cart')
      .then((res) => {
        console.log("Cart Data from API:", res); // Debugging output
        if (Array.isArray(res)) {
          setCartData(res);
          setSelectedQuantity(res?.quantity)
        } else {
          setCartData([]); // ✅ Fallback if data is not an array
        }
      })
      .catch(error => {
        console.error("Error fetching cart data:", error);
        setCartData([]); // ✅ Ensuring the app does not crash
      });
  }, []);

  const quantity = (val) => {
    setProductQuantity(val);
    setChangeQuantity(val);
  };
  
  const selectedItem = (item, quantityVal) => {
    if (quantityVal !== 0) {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
  
      const updatedCartFields = {
        productTitle: item?.name || item?.productTitle || "Unknown Product",
        image: item?.image || "",
        rating: item?.rating ?? 0,
        price: item?.price ?? 0,
        quantity: quantityVal ?? 1, // Ensure quantityVal is used
        subTotal: parseInt((item?.price ?? 0) * (quantityVal ?? 1)),
        productId: item?._id || "",
        userId: user?.userId || "Guest",
      };
  
      console.log("Updated Cart Fields:", updatedCartFields);
  
      // 🔹 Optimistically update UI
      const prevCartData = [...cartData];
      setCartData((prevCartData) =>
        prevCartData.map((cartItem) =>
          cartItem._id === item._id ? { ...cartItem, quantity: quantityVal, subTotal: parseInt(item?.price * quantityVal) } : cartItem
        )
      );
  
      // 🔹 Send API request to update backend
      editData(`/cart/${item?._id}`, updatedCartFields)
        .then(() => {
          return fetchDataFromApi(`/cart`);
        })
        .then((res) => {
          setCartData(res); // Update state with fresh data
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error updating cart:", error);
          setCartData(prevCartData); // Revert to previous state if error occurs
          setIsLoading(false);
        });
    }
  };

  const removeItem=(id)=>{
  deleteData(`/cart/${id}`).then((res)=>{
    context.setAlertBox({
      open:true,
      error:false,
      msg:"item removed from cart!"
    })
    fetchDataFromApi(`/cart`).then((res)=>{
      setCartData(res);
    })
  })
  } 

  return (
    <>
      <div className="container mt-5">
        {/* Free Shipping Notice */}
        <div className="alert alert-light text-center">
          Add <strong className="text-danger">₹39.46</strong> to cart and get free shipping!
          <div className="progress mt-2">
            <div className="progress-bar bg-danger" style={{ width: "20%" }}></div>
          </div>
        </div>

        <div className="row">
          {/* Cart Items (Left Side) */}
          <div className="col-lg-8 col-md-7 cart-img cart table-responsive overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th width="35%">Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th className="text-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(cartData) && cartData.length > 0 ? (
                  cartData.map((item, index) => (
                    <tr key={item?._id || index}>
                      <td>
                        <Link to={`/product/${item?.productId}`}>
                          <div className="d-flex align-items-center cart-imgwrapper">
                            <div className="imgwrapper">
                              <img src={item?.image} alt="Product" />
                            </div>
                            <div className="info px-3">
                              <h6>{item?.productTitle}</h6>
                              <Rating name="read-only" value={item?.rating} size="small" readOnly />
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td>₹{item?.price}</td>
                      <td><Qunatity quantity={quantity} item={item} selectedItem={selectedItem} value={item?.quantity}/></td>
                      <td>₹{item?.subTotal}</td>
                      <td className="text-center">
                        <button onClick={()=>removeItem(item?._id)} className="btn btn-danger btn-sm">&times;</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No items in cart</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Coupon Input */}
            <div className="d-flex justify-content-between mt-4 pb-3">
              <input type="text" className="form-control w-75" placeholder="Coupon code" />
              <button className="btn btn-success">Apply Coupon</button>
            </div>
          </div>

          {/* Cart Totals (Right Side) */}
          <div className="col-lg-4 col-md-5">
            <div className="cart-total p-3 border rounded bg-white">
              <h5>Cart Totals</h5>
              <hr />

              <div className="d-flex justify-content-between">
                <p>Subtotal</p>
                <p className="text-danger"> ₹
                  {
                    cartData.length!==0 && cartData.map(item=>parseInt(item.price)*item.quantity).reduce((total,value)=>
                    total+value,0)
                  }
                  
                </p>
              </div>

              <div className="d-flex justify-content-between">
                <p>Shipping</p>
                <div className="d-flex flex-column align-items-end">
                  <p>Free</p>
                </div>
              </div>
              {/* <div className="d-flex justify-content-between">
                <p>Tax</p>
                <div className="d-flex flex-column align-items-end">
                  <p>18%</p>
                </div>
              </div> */}
              <div className="d-flex justify-content-between">
                <p>Estimate for</p>
                <div className="d-flex flex-column align-items-end">
                  <p>United Kingdom</p>
                </div>
              </div>

              <hr />

              <div className="d-flex justify-content-between">
                <h5>Total:</h5>
                <h5 className="text-danger">₹ 
                {
                    cartData.length!==0 && cartData.map(item=>parseInt(item.price)*item.quantity).reduce((total,value)=>
                    total+value,0)
                  }
                </h5>
              </div>

             <Link to="/checkout"><button className="btn btn-danger w-100 mt-3">Proceed to Checkout &nbsp;<FaShoppingCart className='pb-1 text-2xl"'/></button></Link> 
            </div>
          </div>
        </div>
      </div>
      
      {isLoading && <div className="loading"></div>}
    </>
  );
};

export default Cart;




