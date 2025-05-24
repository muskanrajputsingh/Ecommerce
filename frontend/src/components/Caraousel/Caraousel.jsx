import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./Caraousel.css"; 

export default function Caraousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,  // Enables automatic sliding
    autoplaySpeed: 3000, // Slide changes every 3 seconds
    fade: true, // Smooth fade effect
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src="https://www.westside.com/cdn/shop/files/WEB_f64d18e4-db1d-477a-a72d-3d7f42cde8ba.jpg?v=1741268535" alt="Banner 5" />
        </div>
        <div>
          <img src="https://images.bestsellerclothing.in/live/image/catalog/brandstore/bestseller/banners/ol_ss25new_web_14022025.jpg" alt="Banner 2" />
        </div>
        <div>
          <img src="https://images.bestsellerclothing.in/live/image/catalog/brandstore/bestseller/banners/2400x950px-Only-Peanuts-HP-Desk__HP-Mob_28022025.jpg?width=1920&height=760&mode=fill&fill=blur&format=auto" alt="Banner 3" />
        </div>
        <div>
          <img src="https://www.anitadongre.com/on/demandware.static/-/Sites-AD-INDIA-Library/default/dw89d899b8/images/Home%20page/March_2025/VAANA_Desk__Hero_banner_4_March_25.jpg" alt="Banner 1" />
        </div>
        <div>
          <img src="https://images.bestsellerclothing.in/live/image/catalog/brandstore/bestseller/banners/1920-x-640px_NYBS_web_04032025.jpg" alt="Banner 6" />
        </div>
        <div>
            <img src="https://www.westside.com/cdn/shop/files/DRESSES_114dc409-4616-4abf-b2a8-68ac75ee676f.jpg?v=1741856916" alt="" />
        </div>
      </Slider>
    </div>
  );
}
