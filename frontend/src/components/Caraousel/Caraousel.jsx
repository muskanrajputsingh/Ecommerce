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
          <img src="https://littleboxindia.com/cdn/shop/files/TS_BANNER_WEB_V1_D1.png?v=1758985319&width=1920" alt="Banner 2" />
        </div>
        <div>
          <img src="https://www.anitadongre.com/on/demandware.static/-/Sites-AD-INDIA-Library/default/dw89d899b8/images/Home%20page/March_2025/VAANA_Desk__Hero_banner_4_March_25.jpg" alt="Banner 1" />
        </div>
         <div>
            <img src="https://www.westside.com/cdn/shop/files/DRESSES_114dc409-4616-4abf-b2a8-68ac75ee676f.jpg?v=1741856916" alt="" />
        </div>
          <div>
          <img src="https://littleboxindia.com/cdn/shop/files/use_code_friyaay9_3.jpg?v=1761652798&width=1920" alt="Banner 3" />
        </div>
      </Slider>
    </div>
  );
}
