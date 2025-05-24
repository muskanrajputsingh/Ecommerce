import React,{ useRef }  from 'react'
import './productzoom.css';
import Slider from 'react-slick';
import InnerImageZoom from 'react-inner-image-zoom';
const ProductZoom = () => {
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
  };

  const settings2 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const goto = (index) => {
    zoomSlider.current.slickGoTo(index);
    zoomSliderBig.current.slickGoTo(index);
  };

  return (
    <div className="productZoom position-relative">
      <div className="badge">40%</div>
      <Slider {...settings2} className="zoomSliderBig" ref={zoomSliderBig}>
        <div className="item">
          <InnerImageZoom
            zoomType="hover"
            zoomScale={1.5}
            src="https://images.bestsellerclothing.in/data/only/04-oct-2024/195152901_g0.jpg?width=380&height=500&mode=fill&fill=blur&format=auto"
            className="zoomedImage"
          />
        </div>
      </Slider>
      <Slider {...settings} className='zoomSlider' ref={zoomSlider}>
        <div className="item" onClick={() => goto(0)}>
          <img src="https://cdn.create.vista.com/downloads/fd1b7811-a3ee-453a-a3f3-453d1ad1145f_360.jpeg" alt="" className='w-100' />
        </div>
      </Slider>
      <Slider {...settings} className='zoomSlider' ref={zoomSlider}>
        <div className="item" onClick={() => goto(0)}>
          <img src="https://cdn.create.vista.com/downloads/fd1b7811-a3ee-453a-a3f3-453d1ad1145f_360.jpeg" alt="" className='w-100' />
        </div>
      </Slider>
      <Slider {...settings} className='zoomSlider' ref={zoomSlider}>
        <div className="item" onClick={() => goto(0)}>
          <img src="https://cdn.create.vista.com/downloads/fd1b7811-a3ee-453a-a3f3-453d1ad1145f_360.jpeg" alt="" className='w-100' />
        </div>
      </Slider>
    </div>
  );
};

export default ProductZoom
