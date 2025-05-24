import React, { useEffect, useState } from 'react';
import './ProductView.css';
import { MdClose } from 'react-icons/md';
import { Dialog } from '@mui/material';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Qunatity from '../qunatityBox/Qunatity';
import { CiHeart } from "react-icons/ci";
import { MdOutlineCompareArrows } from "react-icons/md";
import ProductZoom from '../productZoom/ProductZoom';
import { FaShoppingCart } from "react-icons/fa";
import { fetchDataFromApi } from '../../utils/api';
import { MyContext } from '../../App';
import { useContext } from 'react';

const ProductView = ({ open, closeProductModal }) => {
  const [productData, setProductData] = useState(null);
   let [productQuantity,setProductQuantity]=useState();
   let [cartFields,setCartFields]=useState({});
   const context = useContext(MyContext);

  useEffect(() => {
    if (open && open.open) {
      fetchDataFromApi(`/product/${open.id}`)
        .then((res) => {
          setProductData(res);
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [open]); 

  const quantity = (val) => {
    setProductQuantity(val);
  };
  
  const addtoCart = (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  cartFields.productTitle = productData?.name;
  cartFields.image = productData?.images[0];
  cartFields.rating = productData?.rating;
  cartFields.price = productData?.price;
  cartFields.quantity = productQuantity;
  cartFields.subTotal = parseInt(productData?.price * productQuantity);
  cartFields.productId = productData?._id;
  cartFields.userId = user?.userId;

  context.addToCart(cartFields);
}

  const selectedItem=()=>{}

  return (
    <Dialog open={open} className="productModal" onClose={closeProductModal} keepMounted>
      <div className="modalContent">
        <div className="btn-close">
          <Button className="close_" onClick={closeProductModal}>
            <MdClose />
          </Button>
        </div>

        {/* Render product details dynamically */}
        <h4>{productData?.name || "Loading..."}</h4>
        <div className="brandInfo d-flex align-items-center">
          <span>Brand:</span>
          <span className="ml-1">{productData?.brand || "N/A"}</span>
          <Rating className='ml-4' name="read-only" value={productData?.rating || 0} precision={0.5} size='small' readOnly />
        </div>
        <hr />
        
        <div className="row mt-2 productDetailModal">
          <div className="col-md-5">
            <ProductZoom images={productData?.images || "default-image.jpg"} discount={productData?.discount}/>
          </div>

          <div className="col-md-7">
            <div className="d-flex info align-items-center mb-4">
              <span className="oldPrice lg mr-2">₹{productData?.oldPrice || 0}</span>
              <span className="netPrice text-danger lg">₹{productData?.price || 0}</span>
            </div>
            <span className='badge bg-success'>{productData?.countInStock > 0 ? "In Stock" : "Out of Stock"}</span>
            <p className="mt-3">
              {productData?.description || "No description available."}
            </p>

            <div className="d-flex align-items-center">
            <Qunatity quantity={quantity} selectedItem={selectedItem}/>
            <button className="btn-blue btn-lg btn-big btn-round ml-3" onClick={()=>addtoCart()}><FaShoppingCart/> &nbsp; 
             {
              context.addingInCart===true ? "adding..." : "Add to cart"
             }
            </button>
              {/* <Qunatity />
              <button className="btn-blue btn-lg btn-big btn-round ml-3">
                <FaShoppingCart /> &nbsp; Add to Cart
              </button> */}
            </div>
            
            <div className="d-flex align-items-center mt-5 actions btn-wish">
              <button className='btn-round btn-sml mr-3' variant="outlined">
                <CiHeart /> &nbsp; Add to Wishlist
              </button>
              <button className='btn-round btn-sml' variant="outlined">
                <MdOutlineCompareArrows /> &nbsp; Compare
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductView;
