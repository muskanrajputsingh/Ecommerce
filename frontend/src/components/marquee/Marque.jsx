import React from 'react'
import './Marque.css';
import { Link } from 'react-router-dom';

const Marque = () => {
  return (
    <>
      {/* <!-- marqueee --> */}
  <div className="image-marquee">
    <div className="image-track">
    <Link to=""><img src="https://res.cloudinary.com/dyntugwaq/image/upload/v1739285789/DRESS_qm4jck.png" alt="" /></Link> 
      <Link to=""><img src="https://res.cloudinary.com/dyntugwaq/image/upload/v1739283798/gor1nh9aun30px2rtgy6.jpg" alt="" /></Link>
      <Link to="https://www.google.com/"><img src="https://res.cloudinary.com/dyntugwaq/image/upload/v1739284883/WINTER_WEAR_qrz8ob.png" alt="" /></Link>
      <Link to="https://www.google.com/"><img src="https://res.cloudinary.com/dyntugwaq/image/upload/v1739288216/CARDIGAN_1_y3cq7p.png" alt="" /></Link>
      <Link to=""><img src="https://res.cloudinary.com/dyntugwaq/image/upload/v1739288679/DRESS_3_idd7fl.png" alt="" /></Link>
        {/* <!-- Repeat the images for seamless looping --> */}
      <Link to=""><img src="https://res.cloudinary.com/dyntugwaq/image/upload/v1739288477/DRESS_2_ixw4wo.png" alt="" /></Link>
      <Link to=""><img src="https://res.cloudinary.com/dyntugwaq/image/upload/v1739289660/DRESS_5_uwiss4.png" alt="" /></Link>
      <Link to=""><img src="https://res.cloudinary.com/dyntugwaq/image/upload/v1739290023/DRESS_7_zbqy0y.png" alt="" /></Link>
      <Link to=""><img src="https://res.cloudinary.com/dyntugwaq/image/upload/v1739290143/DRESS_8_a8kuvh.png" alt="" /></Link> 
      <Link to=""><img src="https://images.bestsellerclothing.in/live/image/catalog/brandstore/bestseller/banners/ol_460x520px-Only-Tops_19112024.jpg" alt="" /></Link>
      <Link to=""><img src="https://res.cloudinary.com/dyntugwaq/image/upload/v1739283798/gor1nh9aun30px2rtgy6.jpg" alt="" /></Link>
      <Link to="https://www.google.com/"><img src="https://res.cloudinary.com/dyntugwaq/image/upload/v1739284883/WINTER_WEAR_qrz8ob.png" alt="" /></Link>
      
    </div>
</div>
    </>
  )
}

export default Marque
