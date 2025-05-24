import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaAngleRight } from "react-icons/fa6";
import './Cat.css';

const Cat = () => {

  const [itemBg,setItemBg]=useState([
 '#A9A9A9',
 '#808080',
 '#D3D3D3',
  '#C0C0C0',
  '#708090',
  '#778899',
 '#2F4F4F',
 '#A9A9A9',
 '#696969',
 '#808080',
 '#D3D3D3',
  '#DCDCDC',
  '#C0C0C0',
  '#708090',
  '#808080',
 '#D3D3D3',
  '#DCDCDC',
  '#C0C0C0',
  '#708090',
  ])

  return (
    <>
      <section className='homeCat'>
       <div className="containerr">
       <Swiper
                slidesPerView={8}
                spaceBetween={8}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                slidesPerGroup={1}
              >
                {
                    itemBg?.map((item,index)=>{
                        return(
                            <SwiperSlide>
                            <div className="item text-center" style={{background:item}}>
                                <img src="https://cdn.create.vista.com/downloads/fd1b7811-a3ee-453a-a3f3-453d1ad1145f_360.jpeg" alt="" />
                                <h5>crop top</h5>
                            </div>
                          </SwiperSlide>
                        )
                    })
                }
          
        </Swiper>
       </div>
      </section>
    </>
  )
}

export default Cat
