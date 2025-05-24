import React, { useContext, useEffect, useState } from 'react'
import ProductZoom from '../../components/productZoom/ProductZoom'
import './ProductDetail.css'
import Rating from '@mui/material/Rating';
import Qunatity from '../../components/qunatityBox/Qunatity';
import { FaShoppingCart } from "react-icons/fa";
import Button from '@mui/material/Button';
import { FaRegHeart } from 'react-icons/fa6';
import Tooltip from '@mui/material/Tooltip';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaAngleRight } from "react-icons/fa6";
import CardItem from '../../components/product-card/CardItem';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import { MyContext } from '../../App';

const ProductDetail = () => {
  const {id} = useParams();
  const[activeSize,setActiveSize]=useState(null);
  const [activeTabs,setActiveTabs] = useState(0);

  const isActive=(index)=>{
    setActiveSize(index);
    setTabError(false);
  }

  const [productData,setProductData]=useState([]);
  const [relatedProduct,setRelatedProduct]=useState([]);
  const context = useContext(MyContext)
  let [cartFields,setCartFields]=useState({});
  let [productQuantity,setProductQuantity]=useState();
  const [tabError,setTabError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    fetchDataFromApi(`/product/${id}`).then((res) => {
      console.log("API Response:", res);
      setProductData(res || {}); 
      // Fetch related products based on sub-category
      if (res?.subCat?._id) {  // Correct way to access subCatId
        fetchDataFromApi(`/product?subCatId=${res.subCat._id}`).then((relatedRes) => {
          console.log("Related Products API Response:", relatedRes);

          if (Array.isArray(relatedRes?.products)) {
            console.log("Before Filtering:", relatedRes.products);

            // Ensure filtering is done based on _id instead of id
            const filteredData = relatedRes.products.filter(item => {
              console.log(`Checking item: ${item._id} against current id: ${id}`);
              return String(item._id) !== String(id);
            });

            console.log("Filtered Related Products:", filteredData);
            setRelatedProduct(filteredData);
          } else {
            console.error("Unexpected related products structure:", relatedRes);
            setRelatedProduct([]);
          }
        }).catch(err => console.error("Error fetching related products:", err));
      }
    }).catch(err => console.error("Error fetching product data:", err));

}, [id]);

const quantity = (val) => {
  setProductQuantity(val);
};

const addtoCart=(data)=>{
  if(activeSize!==null){
    const user = JSON.parse(localStorage.getItem("user"));

    cartFields.productTitle = productData?.name
    cartFields.image = productData?.images[0]
    cartFields.rating = productData?.rating
    cartFields.price = productData?.price
    cartFields.quantity = productQuantity
    cartFields.subTotal = parseInt(productData?.price * productQuantity)
    cartFields.productId = productData?._id
    cartFields.userId = user?.userId
  
    context.addToCart(cartFields);
  }else{
    setTabError(true);
  }
}

const selectedItem=()=>{

}

  return (
    <>
      <section className="productDetails section">
        <div className="container">
          <div className="row row-detail">
            <div className="col-md-4 pl-5">
              <ProductZoom images={productData?.images || "default-image.jpg"} discount={productData?.discount}/>
            </div>
            <div className="col-md-7 pl-5 pr-5">
            <h2 className='hd text-capitalize'>{productData?.name}</h2>
          <ul className="list list-inline d-flex align-items-center">
            <li className="list-inline-item">
              <div className="d-flex align-items-center">
              <span style={{ color: 'lightgrey' }} className="mr-2">Brands :</span>
                <span>{productData.brand}</span>
              </div>
            </li>

           <li className="list-inline-item">
           <div className="d-flex align-items-center">
           <Rating className='ml-4' name="read-only" value={productData?.rating || 0} precision={0.5} size='small' readOnly />
           <div style={{ color: 'lightgrey' }} className="cursor ml-2">1 Review</div>
           </div>
           </li>
          </ul>

          <div className="col-md-9 cartt">
            <div className="d-flex info align-items-center mb-4">
            <span className="oldPrice lg mr-2">₹{productData.oldPrice}</span>
            <span className="netPrice text-danger lg">₹{productData.price}</span>
            </div>
            <span className='badge bg-success'>{productData?.countInStock > 0 ? "In Stock" : "Out of Stock"}</span>
            <p className="mt-3">
            {productData.description}
            </p>

          <div className="productsize d-flex align-items-center">
            <span>Size:</span>
            <ul className={`list list-inline mb-0 pl-4 ${tabError===true && 'error'}`}>
              <li className="list-inline-item">
                <a className={`tag ${activeSize === 0 ? 'active' : ''}`} onClick={()=>isActive(0)}>S</a>
              </li>
              <li className="list-inline-item">
                <a className={`tag ${activeSize === 1 ? 'active' : ''}`} onClick={()=>isActive(1)}>M</a>
              </li>
              <li className="list-inline-item">
                <a className={`tag ${activeSize === 2 ? 'active' : ''}`} onClick={()=>isActive(2)}>L</a>
              </li>
              <li className="list-inline-item">
                <a className={`tag ${activeSize === 3 ? 'active' : ''}`} onClick={()=>isActive(3)}>XL</a>
              </li>
              <li className="list-inline-item">
                <a className={`tag ${activeSize === 4 ? 'active' : ''}`} onClick={()=>isActive(4)}>XLL</a>
              </li>
            </ul>

          </div>

           <div className="d-flex align-items-center">
           <Qunatity quantity={quantity} selectedItem={selectedItem}/>
            <button className="btn-blue btn-lg btn-big btn-round ml-3" onClick={()=>addtoCart()}><FaShoppingCart/> &nbsp; 
             {
              context.addingInCart===true ? "adding..." : "Add to cart"
             }
            </button>
            <Tooltip title="Add to Wishlist" placement='top'>
            <Button className="btn-blue btn-lg btn-big btn-circle ml-3"><FaRegHeart /></Button></Tooltip>
           </div>
          </div>

            </div>
          </div>

  {/* second part  */}
  <br />
     <div className="card mt-4 p-5 detailsPageTabs">
      <div className="customTabs">
        <ul className="list list-inline">
        <li className="list-inline-item">
       <Button
        className={`${activeTabs === 0 ? 'active' : ''}`}
         onClick={() => setActiveTabs(0)}>Description</Button>
       </li>
    
       <li className="list-inline-item">
       <Button
        className={`${activeTabs === 1 ? 'active' : ''}`}
         onClick={() => setActiveTabs(1)}>Additional info</Button>
       </li>

       <li className="list-inline-item">
       <Button
        className={`${activeTabs === 2 ? 'active' : ''}`}
         onClick={() => {setActiveTabs(2)
          // showReviews()
         }}>Reviews(3)</Button>
       </li>
        </ul>

      <br />
      {
        activeTabs === 0 &&
        <div className="tabContent">
          <p>{productData.description}</p>
        </div>
      }

      {
        activeTabs===1 &&

        <div className="tabContent">
          <div className="table-responsive">
            <div className="table table-bordered">
              <tbody>
                <tr className='stand-up'>
                  <th>Stand Up</th>
                  <td>
                   <p>35'' L x 24''W x 37-45''H(front to back wheel) </p>
                  </td>
                </tr>

                <tr className="folded-wo-wheels">
                 <th>Folded (w/o wheels)</th>
                 <td>
                   <p>35'' L x 24''W x 37-45''H(front to back wheel) </p>
                  </td>
                </tr>
                <tr className='door-pass-through'>
                 <th>door pass through</th>
                 <td>
                  <p>24</p>
                 </td>
                </tr>
                <tr className='frame'>
                 <th>frame</th>
                 <td>
                  <p>Aluminum</p>
                 </td>
                </tr>
                <tr className='weight-wo-wheels'>
                 <th>Weight(w/o wheels)</th>
                 <td>
                  <p>20 LBS</p>
                 </td>
                </tr>
                <tr className='weight-cappacity'>
                 <th>Weight capacity</th>
                 <td>
                  <p>60 LBS</p>
                 </td>
                </tr>
                <tr className='width'>
                  <th>width</th>
                  <td>
                    <p>24''</p>
                  </td>
                </tr>
                <tr className='seat-back-height'>
                  <th>seat back height</th>
                  <td>
                    <p>21.5''</p>
                  </td>
                </tr>
                <tr className='head-room-inside-canopy'>
                  <th>Head room (inside canopy)</th>
                  <td>
                    <p>25''</p>
                  </td>
                </tr>
                <tr className='pa_color'>
                  <th>color</th>
                  <td>
                    <p>black,blue,red,white</p>
                  </td>
                </tr>
              </tbody>
            </div>
          </div>
        </div>
      }

      {
        activeTabs === 2 && 
        <div className="tabContent">
          <div className="row">
            <div className="col-md-8">
              <h3>Customer questions & answers</h3>
              <br />

              <div className="card p-4 reviewCard flex-row">
               <div className="image">
                <div className="rounded-circle">
                  <img src="" alt="" />
                </div>
                <span className="text-g d-block text-center font-weight-bold">rinku verma</span>
               </div>
               <div className="info pl-5">
                <div className="d-flex align-items-center w-100">
                  <h5 className="text-secondary">13-02-2025</h5>
                    <div className="ml-auto">
                      <Rating name="half-rating-read"
                       value={4.5} precision={0.5} readOnly />
                    </div>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum nemo perspiciatis facere voluptate aspernatur. Vitae, exercitationem! Placeat, expedita omnis tempora facilis esse rerum, repellat illum sed veritatis odit dolor pariatur!</p>
               </div>
              </div>
                
           <br className='res-hide' />
           <br className='res-hide' />

           <form className="reviewForm" >
            <h4>Add a Review</h4><br />
            <div className="form-group">
              <textarea className="form-control" name='review' placeholder='write a Review'></textarea>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group rname">
                  <input type="text" value="" placeholder='Name' name='username' />
                </div>
              </div>
   
              <div className="col-md-6">
                <div className="form-group">
                  <Rating name='rating'  value={4.5} precision={0.5} />
                </div>
              </div>
            </div>
            <br />
            <div className="form-group rbtn">
              <button type="submit" className="btn-g btn-lg">Submit Review</button>
            </div>

           </form>


            </div>

          <div className="col-md-4 pl-5 reviewBox">
            <h4>Customer reviews</h4>
            <div className="d-flex align-items-center mt-2">
              <Rating name='half-rating-read' defaultValue={4.5} precision={0.5} readOnly />
              <strong className='ml-3'>4.5 out of 5</strong>
            </div>
           <br />
           <div className="progressBarBox d-flex align-items-center">
             <span className="mr-3">5 star</span>
             <div className="progress" style={{width:'78%',height:'20px'}}>
              <div className="progress-bar bg-success" style={{width:'98%',height:'20px'}}>99%</div>
             </div>
           </div>
           <div className="progressBarBox d-flex align-items-center">
             <span className="mr-3">4 star</span>
             <div className="progress" style={{width:'78%',height:'20px'}}>
              <div className="progress-bar bg-success" style={{width:'85%',height:'20px'}}>85%</div>
             </div>
           </div>
           <div className="progressBarBox d-flex align-items-center">
             <span className="mr-3">3 star</span>
             <div className="progress" style={{width:'78%',height:'20px'}}>
              <div className="progress-bar bg-success" style={{width:'75%',height:'20px'}}>75%</div>
             </div>
           </div>
           <div className="progressBarBox d-flex align-items-center">
             <span className="mr-3">2 star</span>
             <div className="progress" style={{width:'78%',height:'20px'}}>
              <div className="progress-bar bg-success" style={{width:'55%',height:'20px'}}>55%</div>
             </div>
           </div>
           <div className="progressBarBox d-flex align-items-center">
             <span className="mr-3">1 star</span>
             <div className="progress" style={{width:'78%',height:'20px'}}>
              <div className="progress-bar bg-success" style={{width:'30%',height:'20px'}}>30%</div>
             </div>
           </div>

          </div>


          </div>
        </div>
      }

      </div>
     </div>

     <div className="related-product_row w-100 mt-4">
      <h5 my-5>Related Products</h5>
      
              <Swiper
                slidesPerView={4}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
             {
              relatedProduct?.length !== 0 && relatedProduct?.map((item,index)=>{
                return(
                  <SwiperSlide key={index}>
                  <CardItem item={item}/>
                </SwiperSlide>
                )
              })
             }

               </Swiper>
            </div>

        </div>
      </section>
    </>
  )
}

export default ProductDetail
