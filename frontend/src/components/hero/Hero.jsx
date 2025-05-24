import React from 'react'
import Slider from "react-slick";
import './Hero.css'; 

const Hero = () => {
    var settings = {
        dots:false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <>
      <div className="homeBannerSection my-3">
      <Slider {...settings}>
      <div className='item'>
        <img src="https://images.bestsellerclothing.in/live/image/catalog/brandstore/bestseller/banners/ol_chillszn_web_30102024.jpg?width=1920&height=760&mode=fill&fill=blur&format=auto" className='w-100' alt="" />
      </div>
      <div className='item'>
        <img src="https://images.bestsellerclothing.in/live/image/catalog/brandstore/bestseller/banners/ol_paintone_web_17122024.jpg" className='w-100' height="580px" alt="" />
      </div>
      <div className='item'>
        <img src="https://images.bestsellerclothing.in/live/image/catalog/brandstore/bestseller/banners/ol_2400x950pxOnlySaleUpto50-kotak-HP_13122024.jpg?width=1920&height=760&mode=fill&fill=blur&format=auto" className='w-100' alt="" />
      </div>
      <div className='item'>
        <img src="https://images.bestsellerclothing.in/live/image/catalog/brandstore/bestseller/banners/ol_denim_web_14082024.jpg?width=1920&height=760&mode=fill&fill=blur&format=auto" className='w-100' alt="" />
      </div>
      <div className="item">
          <img src="https://images.pexels.com/photos/1942880/pexels-photo-1942880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className='w-100' height="580px" alt="" />
        </div>
      </Slider>
      </div>
    </>
  )
}

export default Hero
