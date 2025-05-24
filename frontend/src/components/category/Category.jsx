import React, { useState,useEffect } from 'react';
import './Category.css'; 
import { IoMenu } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { FaAngleRight } from "react-icons/fa6";
import { fetchDataFromApi } from "../../utils/api";
import CardItem from '../product-card/CardItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


const Category = () => {
  const [productsData, setProductsData] = useState([]);
  const [isopenSidebarVal,setisopenSidebarVal]=useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("Ethnic");
  const [filterData, setFilterData] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetchDataFromApi("/category?all=true");
      if (res && Array.isArray(res.categoryList)) {
        // Filtering unique categories based on `name`
        const uniqueCategories = Array.from(
          new Map(res.categoryList.map((cat) => [cat.name.toLowerCase(), cat])).values()
        );
        setCategories(uniqueCategories);
      } else {
        console.error("Invalid category response:", res);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchSubCategories = async () => {
    try {
      const res = await fetchDataFromApi("/subcategory?all=true");
      if (res && Array.isArray(res.subCategoryList)) {
        setSubCategories(res.subCategoryList);
      } else {
        console.error("Invalid subcategory response:", res);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  
    // ✅ Fetch Products for Selected Category
    useEffect(() => {
      if (selectedCat) {
        console.log("Fetching products for category:", selectedCat);
  
        fetchDataFromApi(`/product?all=true&perPage=16&catName=${encodeURIComponent(selectedCat)}`)
          .then((res) => {
            console.log("Products API Response:", res);
            setFilterData(res?.products || []);
          })
          .catch((err) => {
            console.error("Error fetching products:", err);
            setFilterData([]);
          });
      }
    }, [selectedCat]);
  
    // ✅ Fetch All Products
    useEffect(() => {
      fetchDataFromApi("/product?perPage=5")
        .then((productRes) => {
          console.log("All Products Data:", productRes);
          setProductsData(productRes?.products || []);
        })
        .catch((err) => console.error("Error fetching all products:", err));
    }, []);
  
    const handleCategoryClick = (category) => {
      setSelectedCat(category.name); 
    };


  return (
    <>
      <nav>
        <div className="container my-3">
            <div className="row">
                <div className="col-sm-3 navPart1">
                    <div className="catWrapper">
                    <div className="allCatTab align-items-center" onClick={()=>setisopenSidebarVal(!isopenSidebarVal)}>
                    <span className='icon1 mr-2'><IoMenu /></span>
                    <span className='text'> ALL CATEGORIES</span>
                    <span className='icon2 ml-2'><FaAngleDown /></span>
                    </div>
                    <div className={`sidebarNav ${isopenSidebarVal===true ? 'open shadow' : ''}`}>
                      <ul>
                      {categories.map((category) => (
                        <li key={category.id}><Link to={'/'}><Button>{category.name}<FaAngleRight className='ml-auto'/></Button></Link>
                        <div className="submenuu">
                        {subCategories
                        .filter(sub => sub.category && sub.category._id === category.id) 
                        .map((sub) => (
                          <Link key={sub.id} to="#"><Button>{sub.subCat}</Button></Link>
                        ))}
                        </div>
                        </li>
                        ))}
                      </ul>                         
                    </div>
                </div>
                </div>
                <div className="col-sm-9 navPart2 d-flex align-items-center">
                <ul className='list list-inline ml-auto'>
                {categories.map((category) => (
                  <li 
                    key={category._id}  
                    onClick={() => handleCategoryClick(category)}  // ✅ Fix Click Event
                    className={`list-inline-item ${selectedCat === category.name ? "active" : ""}`}  // Highlight selected category
                  >
                    <Link to="/">{category.name}</Link>
                    <div className="submenu shadow">
                      {subCategories
                        .filter(sub => sub.category && sub.category._id === category._id) 
                        .map((sub) => (
                          <Link key={sub.id} to={'/'}><Button>{sub.subCat}</Button></Link>
                        ))}
                    </div>
                  </li>
                ))}
              </ul>
              </div>

                  <div className="product_row productRow2 w-100 mt-4">
                  {filterData.length > 0 ? (
                   <Swiper
                   slidesPerView={4}  // Adjust based on screen width
                   spaceBetween={20}
                   breakpoints={{
                     640: { slidesPerView: 2, spaceBetween: 10 },
                     768: { slidesPerView: 3, spaceBetween: 15 },
                     1024: { slidesPerView: 4, spaceBetween: 20 }
                   }}
                   navigation={true}
                   modules={[Navigation]}
                   className="mySwiper"
                 >
                 
                      {filterData.map((item) => (
                        <SwiperSlide key={item._id}>
                          <CardItem item={item} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <p>No products found for {selectedCat}</p>
                  )}
                </div>
            </div>
        </div>
      </nav>
    </>
  )
}

export default Category
