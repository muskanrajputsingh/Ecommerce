import React,{ useRef, useState }  from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import InnerImageZoom from 'react-inner-image-zoom';
import './productzoom.css';
import { Navigation } from 'swiper/modules';

const ProductZoom = (props) => {
    const zoomSliderBig = useRef();
    const zoomSlider=useRef();
    const [slideIndex,setSlideIndex]=useState(0);
      
       const goto=(index)=>{
        setSlideIndex(index);
          zoomSlider.current.swiper.slideTo(index);
          zoomSliderBig.current.swiper.slideTo(index);
       }
      
       const images = Array.isArray(props.images) ? props.images : []; // Ensure array

       return (
         <>
           <div className="productZoom position-relative my-2">
             <div className="badge">{props.discount}%</div>
       
             <Swiper
               slidesPerView={1}
               spaceBetween={0}
               navigation={false}
               slidesPerGroup={1}
               modules={[Navigation]}
               className="zoomSliderBig"
               ref={zoomSliderBig}
             >
               {images.map((img, index) => (
                 <SwiperSlide key={index}>
                   <div className="item">
                  <InnerImageZoom
                  zoomType="hover"
                  zoomScale={0.5}
                  src={img}
                  zoomSrc={img}
                  className="zoomedImage"
                  zoomPreload={true}
                  hideHint={true}
                  zoomPosition="original"
                />

                   </div>
                 </SwiperSlide>
               ))}
             </Swiper>
           </div>
       
           <Swiper
             slidesPerView={4}
             spaceBetween={0}
             navigation={true}
             slidesPerGroup={1}
             modules={[Navigation]}
             className="zoomSlider"
             ref={zoomSlider}
           >
             {images.map((img, index) => (
               <SwiperSlide key={index}>
                 <div className={`item ${slideIndex === index && `item_active`}`}>
                   <img src={img} className="w-100" onClick={() => goto(index)} alt="" />
                 </div>
               </SwiperSlide>
             ))}
           </Swiper>
         </>
       );
       
}

export default ProductZoom

