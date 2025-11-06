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
        <img src="https://www.only.in/cdn/shop/files/CHL_SZN-2400X950.png?v=1760346193&width=2400" className='w-100' height="580px" alt="" />
      </div>
      <div className='item'>
        <img src="https://www.only.in/cdn/shop/files/2400x950px-Only-Denim-HP-Desktop.jpg?v=1756902162&width=2400" className='w-100' alt="" />
      </div>
      <div className='item'>
        <img src="https://www.only.in/cdn/shop/files/1800-x-600px_Only_Autumm-Desktop.jpg?v=1754457895&width=1800" className='w-100' alt="" />
      </div>
      <div className="item">
          <img src="https://www.only.in/cdn/shop/files/2400x950px-Only-CRM-Concert-Ready-Fits-HP-Desktop_2.jpg?v=1760599309&width=2400" className='w-100' height="580px" alt="" />
        </div>
        <div className='item'>
        <img src="" className='w-100' alt="" />
      </div>
      </Slider>
      </div>
    </>
  )
}

export default Hero
