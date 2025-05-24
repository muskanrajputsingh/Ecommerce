import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import CardItem from '../product-card/CardItem';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import { FaBars, FaAngleDown } from 'react-icons/fa';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { TfiLayoutGrid4Alt } from 'react-icons/tfi';
import { fetchDataFromApi } from '../../utils/api';
import './Listing.css';

const Listing = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [ProductView, setProductView] = useState('three');
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Start loading
            try {
                console.log("Fetching products for subCatId:", id);
                const res = await fetchDataFromApi(`/product?subCatId=${id}`);
                setProductData(res.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
                setProductData([]); // Handle errors gracefully
            }
            setLoading(false); // End loading
        };

        if (id) fetchProducts();
    }, [id]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const filterData = async (id) => {
        setLoading(true);
        try {
            const res = await fetchDataFromApi(`/product?subCatId=${id}`);
            setProductData(res.products || []);
        } finally {
            setLoading(false);
        }
    };

    const filterByPrice = async (price, subCatId) => {
        setLoading(true);
        try {
            const res = await fetchDataFromApi(`/product?price=${+price[0]}&maxPrice=${price[1]}&subCatId=${subCatId}`);
            setProductData(res.products || []);
        } finally {
            setLoading(false);
        }
    };

    const filterByBrand = async (brand, subCatId) => {
        setLoading(true);
        try {
            const encodedBrand = encodeURIComponent(brand);
            const res = await fetchDataFromApi(`/product?brand=${encodedBrand}&subCatId=${subCatId}`);
            setProductData(res.products || []);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="product_listing_page">
                <div className="container">
                    <div className="productlisting d-flex">
                        <Sidebar filterData={filterData} filterByPrice={filterByPrice} filterByBrand={filterByBrand} />

                        <div className="content_right">
                        <img src="https://design-library.jp/wp-content/uploads/1711774968_2b79a766.gif" alt="Loading..." />
                            {loading ? (
                                <div className="loading-container">
                                    <p>Loading products...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="showby mt-3 mb-3 d-flex align-items-center">
                                        <div className="d-flex align-items-center btnwrapper">
                                            <Button className={ProductView === 'one' ? 'act' : ''} onClick={() => setProductView('one')}>
                                                <FaBars />
                                            </Button>
                                            <Button className={ProductView === 'three' ? 'act' : ''} onClick={() => setProductView('three')}>
                                                <BsFillGrid3X3GapFill />
                                            </Button>
                                            <Button className={ProductView === 'four' ? 'act' : ''} onClick={() => setProductView('four')}>
                                                <TfiLayoutGrid4Alt />
                                            </Button>
                                        </div>
                                        <div className="ml-auto showbyfilter">
                                            <button onClick={handleClick}>Show  {productData.length} <FaAngleDown /></button>
                                        </div>
                                    </div>
                                    

                                    <div className="productlisting">
                                        {productData.length > 0 ? (
                                            productData.map((item, index) => (
                                                <CardItem itemView={ProductView} key={index} item={item} />
                                            ))
                                        ) : (
                                            <p className="no-products">No products available.</p>
                                        )}
                                    </div>

                                    <div className="d-flex align-items-center mt-5 justify-content-center">
                                        <Pagination count={10} color="success" size="large" />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Listing;
