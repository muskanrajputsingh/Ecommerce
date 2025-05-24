import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { Link, useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import { Radio, RadioGroup } from '@mui/material';

const Sidebar = (props) => {
    const [value, setValue] = useState([50, 3000]); // Price range
    const [subCategories, setSubCategories] = useState([]); // List of subcategories
    const [filterSubCat, setFilterSubcat] = useState('');
    const [subCatId, setSubCatId] = useState('');
    const [filterBrand, setFilterBrand] = useState('');
    const [productData, setProductData] = useState([]); // List of all products
    const { id } = useParams(); // Get sub-category ID from URL

    // Fetch subcategories on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchSubCategories();
    }, []);

    // Fetch product data when sub-category changes
    useEffect(() => {
        if (!id) return;
        setSubCatId(id);
        fetchDataFromApi(`/product?subCatId=${id}`).then((res) => {
            console.log("Products fetched:", res.products);
            setProductData(res.products || []);
        });
    }, [id]);

    // Fetch all subcategories
    const fetchSubCategories = async () => {
        try {
            const res = await fetchDataFromApi("/subcategory?all=true");
            if (res && Array.isArray(res.subCategoryList)) {
                setSubCategories(res.subCategoryList);
                console.log("Subcategories fetched:", res.subCategoryList);
            } else {
                console.error("Invalid subcategory response:", res);
            }
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    // Handle sub-category selection
    const handleChange = (event) => {
        const newSubCatId = event.target.value;
        setFilterSubcat(newSubCatId);
        setSubCatId(newSubCatId);
        props.filterData(newSubCatId);

        // Reset brand selection when changing sub-category
        setFilterBrand('');
    };

    // Handle brand selection
    const handleChangeBrand = (e) => {
        setFilterBrand(e.target.value);
    };

    // Apply brand filtering when both filterBrand and subCatId are available
    useEffect(() => {
        if (filterBrand && subCatId) {
            console.log("Filtering by brand:", filterBrand, "for subCatId:", subCatId);
            props.filterByBrand(filterBrand, subCatId);
        }
    }, [filterBrand, subCatId]);

    // Apply price filtering
    useEffect(() => {
        props.filterByPrice(value, subCatId);
    }, [value, subCatId]);

    // Extract unique brands from products within the selected sub-category
    const uniqueBrands = [...new Set(productData.map((p) => p.brand))];

    return (
        <div className="sidebar">
            <div className="stickyy">
                {/* Product Categories */}
                <div className="filterbox">
                    <h6>PRODUCT CATEGORIES</h6>
                    <div className="scroll">
                        <RadioGroup value={filterSubCat} onChange={handleChange}>
                            {subCategories.map((item, index) => (
                                <FormControlLabel 
                                    key={index} 
                                    value={item._id} 
                                    className="w-100" 
                                    control={<Radio />} 
                                    label={item.subCat} 
                                />
                            ))}
                        </RadioGroup>
                    </div>
                </div>

                {/* Filter by Price */}
                <div className="filterbox">
                    <h6>FILTER BY PRICE</h6>
                    <RangeSlider value={value} onInput={setValue} min={50} max={3000} step={5} />
                    <div className="d-flex pt-2 pb-2 priceRange">
                        <span>From: <strong className="text-dark">Rs: {value[0]}</strong></span>
                        <span className="ml-auto">To: <strong className="text-dark">Rs: {value[1]}</strong></span>
                    </div>
                </div>

                {/* Brands Filter */}
                <div className="filterbox">
                    <h6>BRANDS</h6>
                    <div className="scroll">
                        <RadioGroup value={filterBrand} onChange={handleChangeBrand}>
                            {uniqueBrands.map((brand, index) => (
                                <FormControlLabel 
                                    key={index} 
                                    value={brand} 
                                    className="w-100" 
                                    control={<Radio />} 
                                    label={brand} 
                                />
                            ))}
                        </RadioGroup>
                    </div>
                </div>

                {/* Promotional Banner */}
                <Link to="">
                    <img 
                        src="https://img.freepik.com/premium-photo/fashion-sale-modern-simple-instagram-post-template-premium_1121250-407397.jpg" 
                        className="w-100" 
                        height="350px" 
                        alt="Promotion" 
                        style={{ borderRadius: '8px' }} 
                    />
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
