import React, { useContext, useEffect, useState,useRef } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { BiExport } from 'react-icons/bi';
import { FaPlus, FaRegEye } from 'react-icons/fa6';
import { AiOutlineEdit } from 'react-icons/ai';
import { GoTrash } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { 
  Button, Checkbox, TextField, Dialog, DialogActions, DialogContent, DialogTitle, 
  Select, MenuItem, Rating, Pagination 
} from '@mui/material';
import { myContext } from '../../App';
import { deleteData, fetchDataFromApi,editData } from '../utils/api';
import Searchbox from '../../components/Searchbox';
import { MdClose } from 'react-icons/md';
import { CiHeart } from "react-icons/ci";
import { MdOutlineCompareArrows } from "react-icons/md";
import '../../components/productZoom/productzoom.css'
import { FaShoppingCart } from "react-icons/fa";



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Products = () => {
   const [subCatData, setSubCatData] = useState({ subCategoryList: [], totalPages: 1 });
   const [productCatval, setProductCatVal] =useState('');
  const [catData,setCatData]=useState({ categoryList: [], totalPages: 1 });
  const [categoryFilterVal, setcategoryFilterVal] = useState("all");
  const [productList, setProductList] = useState({ products: [], totalPages: 1 });
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    catName:"",
    subCatId:'',
    category: "",
    subCat:"",
    price: 0,
    oldPrice: 0,
    isFeatured: false,
    size: "",
    discount: 0,
    countInStock: 0,
    brand: "",
    rating: 3,
    images: [],
  });

  const handleChangeCatFilter = (e)=>{
           setcategoryFilterVal(e.target.value);
  }

    //    const handleChangeCategory = (e) => {
    //     const selectedCategoryId = e.target.value;
    //     setProductCatVal(selectedCategoryId);
    //     setFormFields(prev => ({ ...prev, category: selectedCategoryId })); // Ensure formFields.category updates
    // };
    
  const context = useContext(myContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    context.setProgress(40);
    fetchCategory();
    fetchProducts();
    fetchingSubCategory();
    context.setProgress(100);
  }, []); 
  
const fetchingSubCategory = () => {
    window.scrollTo(0,0);
    context.setProgress(20);
    fetchDataFromApi('/subcategory?all=true')
      .then((res) => {
        console.log("API response for subcategories:", res);
        setSubCatData(res);
        context.setProgress(100);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };

  const fetchCategory = () => {
    fetchDataFromApi('/category?all=true').then((res) => {
      if (res && Array.isArray(res.categoryList)) {
        console.log("products:",res.categoryList)
          setCatData({ categoryList: res.categoryList, totalPages: 1 });
      } else {
          console.error("Invalid category response:", res);
      }
  }).catch(error => console.error("Error fetching categories:", error));
};

  const fetchProducts = () => {
    context.setProgress(40);
    fetchDataFromApi("/product").then((res) => {
      setProductList(res);
      console.log("productList:",res)
    });
  };

  const deleteProduct = (id) => {
    context.setProgress(40);
    deleteData(`/product/${id}`).then(() => {
      context.setProgress(100);
      context.setAlertBox({ open: true, error: true, msg: 'Product Deleted!' });

      // Remove deleted product from state
      setProductList((prevList) => ({
        ...prevList,
        products: prevList.products.filter((product) => product._id !== id),
      }));
    });
  };

  const handleChange = (event, value) => {
    context.setProgress(40);
     fetchDataFromApi(`/product?page=${value}`).then((res) => {
      setProductList(res);
      context.setProgress(100);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
    setFormFields({
      name: "",
      description: "",
      catName:"",
      subCatId:"",
      category: "",
      subCat:"",
      price: 0,
      oldPrice: 0,
      isFeatured: false,
      size: "",
      discount: 0,
      countInStock: 0,
      brand: "",
      rating: 3,
      images: [],
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  context.setProgress(40);

  try {
      const updatedProduct = {
      name: formFields.name,
      description: formFields.description,
      catName:formFields.catName,
      subCatId: formFields.subCatId || "",
      price: formFields.price,
      oldPrice: formFields.oldPrice,
      isFeatured: formFields.isFeatured,
      size: formFields.size,
      discount: formFields.discount,
      countInStock: formFields.countInStock,
      brand: formFields.brand,
      rating: formFields.rating,
      images: Array.isArray(formFields.images) ? formFields.images : [formFields.images],
    };
    
    // Only include category if it's valid in dropdown
    if (formFields.category) {
      updatedProduct.category = formFields.category;
    }
    if (formFields.subCat) {
      updatedProduct.subCat = formFields.subCat;
    }
    
    await editData(`/product/${editId}`, updatedProduct);
    

    console.log("Updating Product Data:", updatedProduct);  // Debugging Log

    await editData(`/product/${editId}`, updatedProduct);

    fetchProducts();

    context.setAlertBox({
      open: true,
      error: false,
      msg: "Product updated successfully!",
    });

    context.setProgress(100);
    handleClose();
  } catch (error) {
    console.error("Error updating product:", error);
    context.setAlertBox({
      open: true,
      error: true,
      msg: "Failed to update product!",
    });
  }
};


// const fetchEditProduct = async (id) => {
//   try {
//     setEditId(id);
//     setOpen(true);

//     const res = await fetchDataFromApi(`/product/${id}`);
//     const product = Array.isArray(res) && res.length > 0 ? res[0] : res;

//     if (product && typeof product === "object") {
//       setFormFields({
//         name: product.name || "",
//         description: product.description || "",
//         catName:product.catName || "",
//         category:product.category || "",
//         subCat: product.subCat || "",
//         price: product.price ?? 0,
//         oldPrice: product.oldPrice ?? 0,
//         isFeatured: product.isFeatured ?? false,
//         size: product.size || "",
//         discount: product.discount ?? 0,
//         countInStock: product.countInStock ?? 0,
//         brand: product.brand || "",
//         rating: product.rating ?? 3,
//         images: Array.isArray(product.images) ? product.images : product.images ? [product.images] : [],
//       });

//       setProductCatVal(product.category || "");
//     }
//   } catch (error) {
//     console.error("Error fetching product for edit:", error);
//   }
// };

//category by filter
const fetchEditProduct = async (id) => {
  try {
    setEditId(id);
    setOpen(true);

    const res = await fetchDataFromApi(`/product/${id}`);
    const product = Array.isArray(res) && res.length > 0 ? res[0] : res;

    if (product && typeof product === "object") {
      setFormFields({
        name: product.name || "",
        description: product.description || "",
        catName: product.catName || "",
        subCatId: product.subCat?._id || product.subCat || "",
        category: product.category?._id || product.category || "",
        subCat: product.subCat?._id || product.subCat || "", // Should now work properly
        price: product.price ?? 0,
        oldPrice: product.oldPrice ?? 0,
        isFeatured: product.isFeatured ?? false,
        size: product.size || "",
        discount: product.discount ?? 0,
        countInStock: product.countInStock ?? 0,
        brand: product.brand || "",
        rating: product.rating ?? 3,
        images: Array.isArray(product.images) ? product.images : product.images ? [product.images] : [],
      });

      setProductCatVal(product.category?._id || product.category || "");
    }
  } catch (error) {
    console.error("Error fetching product for edit:", error);
  }
};


const filteredProducts = (productList?.products || []).filter((item) => 
  categoryFilterVal === "all" || item.category?._id === categoryFilterVal
);

//itemview dialogue

const [isOpenProductModel, setisOpenProductModel] = useState(false);
  useEffect(() => {
    console.log("Product modal isOpen:", isOpenProductModel);
  }, [isOpenProductModel]);

  const viewProductDetails = (id) => {
    console.log("Opening modal...");
    setisOpenProductModel(true);
  };

  const closeProductModal = () => {
    console.log("Closing modal...");
    setisOpenProductModel(false); 
  };

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


    const selectCat1 = (cat) => {
      console.log(cat);
      setFormFields((prev) => ({
        ...prev,
        catName: cat,   // ✅ Correctly updating state
      }));
    };
    


  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 mt-3">
          <h2 className="text-[19px] font-[700]">Product List</h2>

          <div className="col w-[27%] ml-auto flex items-center gap-3">
          <Button className="btn-blue !bg-green-600 btn-sm flex items-center"><BiExport className='text-[20px] pr-1 pb-1'/> Export</Button>
          <Button className="btn-blue !bg-blue-600 btn-sm" onClick={()=>context.setisOpenFullScreenPanel({
           open:true,
           model:'Add Product'
          })}>
            <FaPlus className='text-[20px] pr-1 pb-1'/> Add Product</Button>
        </div>

        </div>

     <div className="card mx-2 my-5 shadow-md sm:rounded-lg bg-white text-gray-900">

        <div className="flex items-center py-2 px-5 w-full justify-between pr-5">
            <div className="col w-[20%]">
             <h4 className='font-[600] text-[13px] mb-1'>Category By</h4>
             <Select 
             className='w-full'
             size='small'
             labelId='demo-simple-select-standard-label'
             id="demo-simple-select-standard"
             value={categoryFilterVal}
             onChange={handleChangeCatFilter}
             label="Category"
             >
              <MenuItem value="all">
              <em>all</em>
              </MenuItem>
          {
            catData?.categoryList?.length !== 0 && catData?.categoryList.map((cat,index)=>{
              return(
                <MenuItem key={index} value={cat._id} onClick={() => selectCat1(cat.name)}>
                {cat.name}
             </MenuItem>             
              )
            })
          }
             </Select>
            </div>

         <div className="col ml-auto w-[20%]">
        <Searchbox />
         </div>

        </div>

 <div className="relative overflow-x-auto">
  <table className="w-full text-sm text-left text-gray-700">
    <thead className="text-xs uppercase bg-gray-50">
      <tr>
        <th className="px-6 py-3 w-[50px]"><Checkbox {...label} size='small' /></th>
        <th className="px-6 py-3 w-[120px] whitespace-nowrap">PRODUCT</th>
        <th className="px-6 py-3 w-[140px] whitespace-nowrap">CATEGORY</th>
        <th className="px-6 py-3 w-[140px] whitespace-nowrap">SUB CATEGORY</th>
        <th className="px-6 py-3 w-[180px] whitespace-nowrap">PRICE</th>
        <th className="px-6 py-3 w-[70px] whitespace-nowrap">RATING</th>
        <th className="px-6 py-3 w-[140px] whitespace-nowrap">ACTION</th>
      </tr>
    </thead>

   
    <tbody>
       {
        filteredProducts?.length !== 0 && filteredProducts.map((item, index) =>{
          return(
            <tr key={index} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
            <td className="px-6 py-3 w-[50px]"><Checkbox {...label} size='small' /></td>
  
            <td className="px-6 py-2">
              <div className="flex items-center gap-4 w-[350px]">
                <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                  <Link to={`/product/${item._id}`}>
                    <img src={item.images[0]} alt=""
                      className='w-full group-hover:scale-105 transition-all'
                    />
                  </Link>
                </div>
                <div className="info w-[75%]">
                  <h3 className="font-[500] text-[11px] leading-4 hover:text-blue-700">
                 <Link to={`/product/${item._id}`}>{item.description}</Link>
                  </h3>
                  <span className='font-[600] text-[12px]'>  BRAND: {item.brand}</span>
                </div>
              </div>
            </td>
  
            <td className="px-6 py-2">{item.category?.name}</td>
            <td className="px-6 py-2">{item.subCat?.subCat || "N/A"}</td>

            <td className="px-6 py-2">
              <div className="flex gap-1 flex-col">
                <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                  $ {item.oldPrice}
                </span>
                <span className="price text-blue-500 text-[14px] font-[500]">
                $ {item.price}
                </span>
              </div>
            </td>
            <td className="px-6 py-2">
             <Rating name="read-only" defaultValue={item.rating} precision={0.5} size="small" readOnly/>
            </td>
            <td className="px-6 py-2">
              <div className="flex items-center gap-1">
               
                  <Button className='!w-[35px] !h-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:bg-[#b0b0b0] 
                  bg-[#f1f1f1] !min-w-[35px]' onClick={() => fetchEditProduct(item._id)}>
                    <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]'/>
                  </Button>
                
                  <Button className='!w-[35px] !h-[35px] !rounded-full !border !border-[rgba(0,0,0,0.4)] hover:bg-[#b0b0b0]
                   bg-[#f1f1f1]' style={{ minWidth: '35px' }} onClick={()=>viewProductDetails(item._id)}>
                    <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                  </Button>
               
                  <Button className='!w-[35px] !h-[35px] !border !rounded-full !border-[rgba(0,0,0,0.4)] 
                  hover:bg-[#b0b0b0] bg-[#f1f1f1]' style={{ minWidth: '35px' }} onClick={()=>deleteProduct(item._id)} >
                    <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                  </Button>
               
              </div>
            </td>
          </tr>
          )
        })
       }  
    </tbody>
  </table>
   </div>
   {
    productList?.totalPages>1 && 
    <div className="flex items-center justify-end mt-4 pb-5 px-4">
    <Pagination count={productList?.totalPages} color='primary' className='pagination' showFirstButton showLastButton
    onChange={handleChange} />
    </div>
   }
</div>

 <Dialog open={open} onClose={handleClose} className="rounded-lg editModal">
  <DialogTitle className="bg-gray-100 font-semibold text-lg text-gray-700">
    {editId ? "Edit Product" : "Add Product"}
  </DialogTitle>

  <form onSubmit={handleSubmit}>
    <DialogContent className="p-6 max-h-[70vh] overflow-y-auto">
      {/* Product Name */}
      <TextField
        required
        label="Product Name"
        fullWidth
        name="name"
        value={formFields.name}
        onChange={handleInputChange}
        className="!my-2"
      />

      {/* Product Description */}
      <TextField
        required
        label="Product Description"
        multiline
        rows={3}
        fullWidth
        name="description"
        value={formFields.description}
        onChange={handleInputChange}
        className="!my-2"
      />

      {/* Product Category */}

      {catData?.categoryList?.length > 0 && (
    <Select
    fullWidth
    size="small"
    value={formFields.category}
    onChange={(e) => setFormFields({ ...formFields, category: e.target.value })}
    name="category"
    className="!my-2"
>
    <MenuItem value="">None</MenuItem>
    {[
        ...new Map(catData.categoryList.map((item) => [item.name, item])).values(),
    ].map((item, index) => (
        <MenuItem key={index} value={item._id} onClick={() => selectCat1(item.name)}>
            {item.name}
        </MenuItem>
    ))}
</Select>

)}

{/* Product Sub Category */}

{subCatData?.subCategoryList?.length > 0 && (
    <Select
    fullWidth
    size="small"
    value={formFields.subCat}
    onChange={(e) => setFormFields({ 
      ...formFields, 
      subCat: e.target.value, 
      subCatId: e.target.value  // Ensuring subCatId is also updated
    })}        
    name="subCat"
    className="!my-2"
  >
    <MenuItem value="">None</MenuItem>
    {subCatData?.subCategoryList?.length !== 0 &&
        subCatData?.subCategoryList?.map((subCat, index) => (
            <MenuItem className="text-capitalize" key={index} value={subCat._id}>
                {subCat.subCat} {/* Ensure this displays the correct field */}
            </MenuItem>
        ))
    }
  </Select>

)}

      {/* Price & Old Price */}
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Price"
          type="number"
          fullWidth
          name="price"
          value={formFields.price}
          onChange={handleInputChange}
        />
        <TextField
          label="Old Price"
          type="number"
          fullWidth
          name="oldPrice"
          value={formFields.oldPrice}
          onChange={handleInputChange}
        />
      </div>

      {/* Featured */}
      <Select
        fullWidth
        size="small"
        value={formFields.isFeatured}
        onChange={(e) => setFormFields({ ...formFields, isFeatured: JSON.parse(e.target.value) })}
        name="isFeatured"
        className="!my-2"
      >
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>
      </Select>

      {/* Size */}
      <Select
        fullWidth
        size="small"
        value={formFields.size || ""}
        onChange={(e) => setFormFields({ ...formFields, size: e.target.value })}
        name="size"
        className="!my-2"
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="XS">XS</MenuItem>
        <MenuItem value="S">S</MenuItem>
        <MenuItem value="M">M</MenuItem>
        <MenuItem value="L">L</MenuItem>
        <MenuItem value="XL">XL</MenuItem>
      </Select>

      {/* Discount & Stock */}
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Discount"
          type="number"
          fullWidth
          name="discount"
          value={formFields.discount}
          onChange={handleInputChange}
        />
        <TextField
          label="Stock"
          type="number"
          fullWidth
          name="countInStock"
          value={formFields.countInStock}
          onChange={handleInputChange}
        />
      </div>

      {/* Brand */}
      <TextField
        label="Brand"
        fullWidth
        name="brand"
        value={formFields.brand}
        onChange={handleInputChange}
        className="!my-2"
      />

      {/* Rating */}
      <div className="my-3">
        <Rating
        defaultValue={3}
          precision={0.5}
          name="rating"
          value={formFields.rating}
          onChange={(event, newValue) =>
            setFormFields({ ...formFields, rating: newValue })
          }
        />
      </div>

        <TextField
        label="Product Image URL"
        fullWidth
        name="images"
        value={formFields.images[0] || ""}
        onChange={(e) =>
          setFormFields((prev) => ({
            ...prev,
            images: prev.images.map((img, i) => (i === 0 ? e.target.value : img)),
          }))
        }
        className="!my-2"
      />
      <TextField
        label="Product Image URL"
        fullWidth
        name="images"
        value={formFields.images[1] || ""}
        onChange={(e) =>
          setFormFields((prev) => ({
            ...prev,
            images: prev.images.map((img, i) => (i === 1 ? e.target.value : img)),
          }))
        }
        className="!my-2"
      />
      <TextField
        label="Product Image URL"
        fullWidth
        name="images"
        value={formFields.images[2] || ""}
        onChange={(e) =>
          setFormFields((prev) => ({
            ...prev,
            images: prev.images.map((img, i) => (i === 2 ? e.target.value : img)),
          }))
        }
        className="!my-2"
      />
      <TextField
        label="Product Image URL"
        fullWidth
        name="images"
        value={formFields.images[3] || ""}
        onChange={(e) =>
          setFormFields((prev) => ({
            ...prev,
            images: prev.images.map((img, i) => (i === 3 ? e.target.value : img)),
          }))
        }
        className="!my-2"
      />
    </DialogContent>
    {/* Buttons */}
    <DialogActions className="p-4 my-2">
      <Button type="submit" className="btn-blue bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Submit
      </Button>
      <Button onClick={handleClose} className="btn-red bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">
        Cancel
      </Button>
    </DialogActions>
  </form>
</Dialog>

<Dialog open={isOpenProductModel} className="productModal" onClose={closeProductModal}>
      <div className="modalContent">
        <div className="btn-close">
          <Button className="close_" onClick={closeProductModal}>
            <MdClose />
          </Button>
        </div>
        <h4>Stylish Crop Top</h4>
        <div className="brandInfo d-flex align-items-center">
          <span>Brands:</span>
          <span className="ml-1">Welc's</span>
          <Rating className='ml-4' name="read-only" value={4} precision={0.5} size='small' readOnly />
        </div>
        <hr />
        <div className="row mt-2 productDetailModal">
          <div className="col-md-5">
            {/* <ProductZoom /> */}

          </div>
          <div className="col-md-7">
            <div className="d-flex info align-items-center mb-4">
              <span className="oldPrice lg mr-2">$18.00</span>
              <span className="netPrice text-danger lg">$14.00</span>
            </div>
            <span className='badge bg-success'>In Stock</span>
            <p className="mt-3">This stylish crop top is made from premium materials, ensuring both comfort and style.</p>
            <div className="d-flex align-items-center">
              <button className="btn-blue btn-lg btn-big btn-round ml-3">
                <FaShoppingCart /> &nbsp; Add to Cart
              </button>
            </div>
            <div className="d-flex align-items-center mt-5 actions btn-wish">
              <button className='btn-round btn-sml mr-3' variant="outlined">
                <CiHeart /> &nbsp; Add to Wishlist
              </button>
              <button className='btn-round btn-sml' variant="outlined">
                <MdOutlineCompareArrows /> &nbsp; Compare
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>

    </>
  );
};

export default Products;




































