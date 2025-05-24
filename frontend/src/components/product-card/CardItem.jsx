import React, { useState, useEffect, useRef } from 'react';
import './Card.css';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { TfiFullscreen } from "react-icons/tfi";
import { IoMdHeartEmpty } from "react-icons/io";
import ProductView from '../ProductModel/ProductView';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

const CardItem = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef();
  const [isOpenProductModel, setIsOpenProductModel] = useState(false);

  useEffect(() => {
    console.log("Product modal isOpen:", isOpenProductModel);
  }, [isOpenProductModel]);

  const viewProductDetails = (id) => {
    console.log("Opening modal...");
    setIsOpenProductModel({
      id:id,
      open:true
    });
  };

  const closeProductModal = () => {
    console.log("Closing modal...");
    setIsOpenProductModel(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed:800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    appendDots: dots => (
      <div style={{ position: "absolute", bottom: "10px", width: "100%" }}>
        <ul style={{ margin: "0px", padding: "0px" }}> {dots} </ul>
      </div>
    )
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.slickPlay();
      }
    }, 20);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.slickPause();
      }
    }, 20);
  };

  return (
    <>
      <div 
        className={`productItem ${props.itemView}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="imgwrapper">
          <Link to={`/product/${props.item?._id}`}>
          {isHovered ? (
            <Slider {...settings} ref={sliderRef}>
              {props.item?.images?.map((image, index) => (
                <div key={index} className="slick-slide">
                  <img src={image} alt="Product" className="w-100" />
                </div>
              ))}
            </Slider>
          ) : (
            <img src={props.item?.images[0]} alt="Product" className="w-100" />
          )}
          <span className="badge">{props?.item?.discount}%</span>
          </Link>
          <div className="actions">
            <Button onClick={() => viewProductDetails(props.item?._id)}>
              <TfiFullscreen />
            </Button>
            <Button>
              <IoMdHeartEmpty />
            </Button>
          </div>
        </div>

        <div className="info">
          <h4>{props?.item?.name}</h4>
          <span className="text-success d-block">{props?.item?.countInStock > 0 ? "In Stock" : "Out of Stock"}</span>
          <Rating name="read-only" value={props?.item?.rating} readOnly />
          <div className="d-flex">
            <span className="oldPrice">₹{props?.item?.oldPrice}</span>
            <span className="netPrice text-danger ml-2">₹{props?.item?.price}</span>
          </div>
        </div>
      </div>

     
        <ProductView open={isOpenProductModel} closeProductModal={closeProductModal}/>
     
    </>
  );
};

export default CardItem;
