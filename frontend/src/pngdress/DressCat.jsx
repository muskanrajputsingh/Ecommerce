import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './DressCat.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { fetchDataFromApi } from '../utils/api';

const DressCat = () => {
  const [catData, setCatData] = useState([]);

  useEffect(() => {
    fetchDataFromApi("/category?all=true")
      .then((res) => {
        console.log("API Response:", res);
        setCatData(res.categoryList || []);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <>
      <div className="cat-heading">
        <h3 className='text-center'>𝕊𝕙𝕠𝕡 𝔹𝕪 ℂ𝕒𝕥𝕖𝕘𝕠𝕣𝕚𝕖𝕤</h3>
      </div>

      {/* Swiper for Displaying Product Cards */}
      <div className="hero-head1">
        <Swiper
          slidesPerView={2} /* 2 cards per row */
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          className="mySwipe"
          slidesPerGroup={2} /* Ensures sliding happens in groups of 2 */
          breakpoints={{
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 }, // Adjust for small screens
          }}
        >
          {catData.length !== 0 &&
            catData.map((cat, index) => (
              <SwiperSlide key={index}>
                <div className="product-card">
                  <div className="product-image">
                    <img src={cat.images?.[0] || "https://via.placeholder.com/400"} alt={cat.name} />
                  </div>
                  <div className="product-details">
                    <h1>{cat.name}</h1>
                    <p>Explore our exclusive collection of {cat.name} with top-quality and trendy designs.</p>
                    <Link to="/">
                    <button type="button" className="btn">Explore Now</button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <br />
    </>
  );
};

export default DressCat;






// import React from 'react';
// import './DressCat.css'

// const DressCat = () => {
//   return (
//     <>
//       <div className="cat-heading">
//         <h3 className='text-center'>𝕾𝖍𝖔𝖕 𝕭𝖞 𝕮𝖆𝖙𝖊𝖌𝖔𝖗𝖎𝖊𝖘</h3>
//       </div>

//       <div className="container cat-box">
//       <div class="product-card">
//     <div class="product-image">
//     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm1tz0tImVim-jNmdhZ26Loi4MOb-32owkRA&s"/>
//   </div>
//   <div class="product-details">
//     <h1>Product title</h1>
//     <p>Great product title for a great product and all of the extra things a product might need to make it fill an entire card.</p>
//     <button type="button" class="btn">Buy Now</button>
//   </div>
//       </div>


//       </div>
//     </>
//   )
// }

// export default DressCat




// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import './DressCat.css';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import { fetchDataFromApi } from '../utils/api';

// const DressCat = () => {
//   const [catData, setCatData] = useState([]);

//   useEffect(() => {
//     fetchDataFromApi("/category?all=true").then((res) => {
//       console.log("API Response:", res);
//       setCatData(res);
//     }).catch(err => console.error("Error fetching data:", err));
//   }, []);

//   return (
//     <>
//       <div className="hero-head1">
//         <Swiper
//           slidesPerView={10} /* Adjust based on screen size */
//           spaceBetween={3}
//           navigation={true}
//           modules={[Navigation]}
//           className="mySwipe"
//           slidesPerGroup={1}
//         >
//           {catData?.categoryList?.length !== 0 &&
//             catData?.categoryList?.map((cat, index) => {
//               return (
//                 <SwiperSlide key={index}>
//                   <div className="item text-center">
//                     <Link to="/product1" className="circle">
//                       <img src={cat.images?.[0]} alt="Product" />
//                     </Link>
//                   </div>
//                 </SwiperSlide>
//               );
//             })}
//         </Swiper>
//       </div>
//     </>
//   );
// };

// export default DressCat;



