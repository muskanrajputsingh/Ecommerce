import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaAngleRight } from "react-icons/fa6";
import "./Card.css";
import CardItem from "./CardItem";
import { fetchDataFromApi } from "../../utils/api";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Card = () => {
  const [productsData, setProductsData] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [value, setValue] = useState(0);
  const [catData, setCatData] = useState([]);
  const [selectedCat, setSelectedCat] = useState("Bottom Wear");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    fetchDataFromApi("/category?all=true")
      .then((res) => {
        console.log("Category API Response:", res);
  
        if (res?.categoryList) {
          // Remove duplicate categories based on `name`
          const uniqueCategories = Array.from(new Set(res.categoryList.map(cat => cat.name)))
            .map(name => res.categoryList.find(cat => cat.name === name));
  
          setCatData(uniqueCategories);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);
  

  // Fetch Featured Products
  useEffect(() => {
    fetchDataFromApi("/featured")
      .then((res) => {
        console.log("Featured Products Response:", res);
  
        if (!res || !res.products || res.products.length === 0) {
          console.error("No featured products found.");
          setFeaturedProducts([]);
        } else {
          setFeaturedProducts(res.products);
        }
      })
      .catch((err) => console.error("Error fetching featured products:", err));
  }, []);
  

  // Fetch Products for Selected Category
  useEffect(() => {
    if (selectedCat) {
      console.log("Fetching products for category:",selectedCat);

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

  // Fetch All Products
  useEffect(() => {
    fetchDataFromApi("/product?perPage=12")
      .then((productRes) => {
        console.log("All Products Data:", productRes);
        setProductsData(productRes?.products || []);
      })
      .catch((err) => console.error("Error fetching all products:", err));
  }, []);

  //  Tab Change Handler
  const handleChange = (_, newValue) => {
    setValue(newValue);
    setSelectedCat(catData[newValue]?.name || "");
  };

  return (
    <div className="homeProducts my-4">
      <div className="container">
        <div className="row">
          {/*  Banner Section */}
          <div className="col-md-3">
            <div className="sticky">
              <div className="banner">
                <img
                  src="https://img.freepik.com/premium-photo/fashion-sale-modern-simple-instagram-post-template-premium_776674-1087059.jpg?w=1380"
                  height="416px"
                  width="300"
                  alt="Banner"
                  className="cursor w-100"
                />
              </div>
              <div className="banner mt-3">
                <img
                  src="https://img.freepik.com/premium-photo/fashion-sale-modern-simple-instagram-post-template-premium_776674-1090142.jpg?w=1380"
                  height="416px"
                  width="300"
                  alt="Banner"
                  className="cursor w-100"
                />
              </div>
            </div>
          </div>

          {/*  Product Section */}
          <div className="col-md-9 productRow">
            <div className="d-flex align-items-center">
              <div className="info w-75">
                <h3 className="mb-0 hd">BEST SELLERS</h3>
                <p className="text-sml mb-0">Do not miss the current offers until the end of March.</p>
              </div>
              <button className="viewAll ml-auto">
                View All <FaAngleRight />
              </button>
            </div>

            {/*  Swiper for Featured Products */}
            <div className="product_row w-100 mt-4">
          {featuredProducts.length > 0 ? (
            <Swiper slidesPerView={3} spaceBetween={20} navigation={true} modules={[Navigation]} className="mySwiper">
              {featuredProducts.map((item, index) => (
                <SwiperSlide key={index}>
                  <CardItem item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p>No featured products available. (Fetched: {JSON.stringify(featuredProducts)})</p>
          )}
        </div>


            {/*  Category Tabs */}
            <div className="d-flex align-items-center mt-5">
              <div className="info w-75">
                <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                <p className="text-sml mb-0">Do not miss the current offers until the end of March.</p>
              </div>
            </div>

            <div className="ml-auto my-4">
              <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" className="filterTab">
                {catData.map((category, index) => (
                  <Tab key={index} label={category.name} />
                ))}
              </Tabs>
            </div>

            {/*  Display Filtered Products */}
            <div className="product_row productRow2 w-100 mt-4 d-flex">
              {filterData.length > 0 ? (
                filterData.map((item) => <CardItem item={item} key={item._id} />)
              ) : (
                <p>No products found for {selectedCat}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
