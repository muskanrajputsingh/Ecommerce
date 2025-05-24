import React,{useState,useRef, useEffect, useContext}from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Rating } from '@mui/material';
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { fetchDataFromApi, postData } from '../utils/api';
import { myContext } from '../../App';
import { ImCross } from "react-icons/im";


const AddProduct = () => {
    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [ratingsValue,setRatingValue] = useState('');
    const [productFeatured, setProductFeatured] = useState('');
    const [productSize,setProductSize] = useState('');
    const [catData,setCatData] = useState([]);
    const [subCatData,setSubCatData] = useState([]);
    const [productImagesArr , setProductImagesArr ] = useState([]);
    const [formFields,setFormFields] = useState({
      name:'',
      description:'',
      brand:'',
      price:null,
      oldPrice:null,
      catName:'',
      subCatId:'',
      category:'',
      subCat:'',
      countInStock:null,
      rating:null,
      isFeatured:null,
      size:'',
      discount:'',
    })

    const context = useContext(myContext);
    const productImages = useRef();

    const handleChangeProductCat = (event) => {
      setProductCat(event.target.value);
      setFormFields(()=>({
        ...formFields,
        category:event.target.value
      }))
    };

    const handleChangeProductSubCat = (event) => {
      setProductSubCat(event.target.value);
      setFormFields(()=>({
        ...formFields,
        subCat:event.target.value
      }))
      // alert(event.target.value)
     formFields.subCatId = event.target.value ;
    };

      const handleChangeProductFeatured = (event) => {
        setProductFeatured(event.target.value);
        setFormFields(()=>({
          ...formFields,
          isFeatured:event.target.value
        }))
      };

      const handleChangeProductSize = (event) => {
        setProductSize(event.target.value);
        setFormFields(()=>({
          ...formFields,
          size:event.target.value
        }))
      };

      const addProductImages=()=>{
        setProductImagesArr(prevArray=>[...prevArray,productImages.current.value]);
        productImages.current.value="";
      }
      const removeImg = (index) => {
        setProductImagesArr((prevArray) => prevArray.filter((_, i) => i !== index));
      };
   
    useEffect(()=>{
      window.scrollTo(0,0);
      context.setProgress(20);
      fetchingCategory();
      fetchingSubCategory();
    },[]);

    const fetchingCategory = () => {
      fetchDataFromApi('/category?all=true').then((res)=>{
        console.log(res)
        setCatData(res);
        context.setProgress(100);
      })
    }

    const fetchingSubCategory = () => {
    window.scrollTo(0,0);
    context.setProgress(20);
    fetchDataFromApi('/subcategory?all=true').then((res) => {
        console.log("API response for subcategories:", res);
        setSubCatData(res);
        context.setProgress(100);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };
   

    const inputChange=(e)=>{
     setFormFields(()=>({
      ...formFields,
      [e.target.name]:e.target.value
     }))
    }

    const addProduct=(e)=>{
     e.preventDefault();
     formFields.images = productImagesArr
     console.log(formFields);

     if(formFields.name===""){
      context.setAlertBox({
        open:true,
        msg:'Please add product name',
        error:true
      })
      return false;
     }
     if(formFields.description===""){
      context.setAlertBox({
        open:true,
        msg:'Please add product description',
        error:true
      })
      return false;
     }
     if(formFields.brand===""){
      context.setAlertBox({
        open:true,
        msg:'Please add product brand',
        error:true
      })
      return false;
     }
     if(formFields.price===null){
      context.setAlertBox({
        open:true,
        msg:'Please add product price',
        error:true
      })
      return false;
     }
     if(formFields.oldPrice===null){
      context.setAlertBox({
        open:true,
        msg:'Please add product oldPrice',
        error:true
      })
      return false;
     }
     if(formFields.category===""){
      context.setAlertBox({
        open:true,
        msg:'Please select product category',
        error:true
      })
      return false;
     }
     if(formFields.subCat===""){
      context.setAlertBox({
        open:true,
        msg:'Please select product sub category',
        error:true
      })
      return false;
     }
     if(formFields.countInStock===null){
      context.setAlertBox({
        open:true,
        msg:'Please add product count In Stock',
        error:true
      })
      return false;
     }
     if(formFields.rating===0){
      context.setAlertBox({
        open:true,
        msg:'Please select product rating',
        error:true
      })
      return false;
     }
     if(formFields.isFeatured===null){
      context.setAlertBox({
        open:true,
        msg:'Please select product is featured or not',
        error:true
      })
      return false;
     }

     postData('/product',formFields).then((res)=>{
      context.setAlertBox({
      open:true,
      msg:"Product added successfully!",
      error:false
      })
      setFormFields({
        name:'',
        description:'',
        brand:'',
        price:0,
        oldPrice:0,
        catName:'',
        subCatId:'',
        category:'',
        subCat:'',
        countInStock:0,
        rating:0,
        isFeatured:false,
        size:'',
        discount:'',
        images:[]
      });

      setTimeout(() => {
        window.location.href = "/products";
      }, 1000); // Redirect after 2 seconds

     });
  }

  const selectCat1=(cat)=>{
    formFields.catName=cat;
  }

  return (
    <>
      <section className="p-5 !bg-gray-50">
        <form className='form p-8 py-3' onSubmit={addProduct}>
       <div className="scroll max-h-[70vh] overflow-y-scroll pr-4">
        <div className='grid grid-cols-1 mb-4'>
        <div className="col">
            <h3 className='text-[14px] mb-1 font-[600]'>Product Name</h3>
            <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none
             focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='name' value={formFields.name} onChange={inputChange}/>
        </div>
        </div>

        <div className='grid grid-cols-1 !py-3 mb-4'>
        <div className="col">
            <h3 className='text-[14px] mb-1 font-[600]'>Product Description</h3>
            <textarea type="text" className='w-full h-[140px] border border-[rgba(0,0,0,0.3)] focus:outline-none 
            focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='description' value={formFields.description} onChange={inputChange}/>
        </div>
        </div>

        <div className='grid grid-cols-4 mb-4 py-3 gap-4'>
          
        <div className="col">
        <h3 className='text-[14px] mb-1 font-[600]'>Product Category</h3>
      <Select
      labelId="demo-simple-select-label"
      id="productCatDrop"
      size="small"
      className="w-full"
      value={productCat}
      label="Category"
      onChange={handleChangeProductCat}
    >
  <MenuItem value={""}>None</MenuItem>
  {
    catData?.categoryList?.length > 0
      ? [...new Map(catData.categoryList.map(cat => [cat.name, cat])).values()]
          .map((cat, index) => (
            <MenuItem
              className="text-capitalize"
              key={index}
              value={cat._id}
              onClick={() => selectCat1(cat.name)}
            >
              {cat.name}
            </MenuItem>
          ))
      : <MenuItem disabled>No Categories Found</MenuItem>
  }
  </Select>
  </div>

        <div className="col">
        <h3 className='text-[14px] mb-1 font-[600]'>Product Sub Category</h3>
        <Select
        labelId="demo-simple-select-label"
        id="productSubCatDrop"
        size="small"
        className="w-full"
        value={productSubCat}
        label="Sub Category"
        onChange={handleChangeProductSubCat}
      >
        <MenuItem value={''}>None</MenuItem>
        {
        subCatData?.subCategoryList?.length !== 0 && 
        subCatData?.subCategoryList?.map((subCat, index) => (
          <MenuItem className="text-capitalize" key={index} value={subCat._id}>
            {subCat.subCat}
          </MenuItem>
        ))
      }
      </Select>

        </div>
        
        <div className="col">
            <h3 className='text-[14px] mb-1 font-[600]'>Product Price</h3>
            <input type="number" className='w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none 
            focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='price' value={formFields.price} onChange={inputChange}/>
        </div>

        <div className="col">
            <h3 className='text-[14px] mb-1 font-[600]'>Product Old Price</h3>
            <input type="number" className='w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none 
            focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='oldPrice' value={formFields.oldPrice} onChange={inputChange}/>
        </div>

        <div className="col">
            <h3 className='text-[14px] mb-1 font-[600]'>Is Featured ?</h3>
        <Select
          labelId="demo-simple-select-label"
          id="productCatDrop"
          size='small'
          className='w-full'
          value={productFeatured}
          label="Category"
          onChange={handleChangeProductFeatured}
        >
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
          <MenuItem value={null}>None</MenuItem>
        </Select>    
        </div>

        <div className="col">
            <h3 className='text-[14px] mb-1 font-[600]'>Product Size</h3>
        <Select
          labelId="demo-simple-select-label"
          id="productCatDrop"
          size='small'
          className='w-full'
          value={productSize}
          label="Category"
          onChange={handleChangeProductSize}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={'XS'}>XS</MenuItem>
          <MenuItem value={'S'}>S</MenuItem>
          <MenuItem value={'M'}>M</MenuItem>
          <MenuItem value={'L'}>L</MenuItem>
          <MenuItem value={'XL'}>XL</MenuItem>
        </Select>    
        </div>

       
        <div className="col">
            <h3 className='text-[14px] mb-1 font-[600]'>Product Discount</h3>
            <input type="number" className='w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none 
            focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='discount' value={formFields.discount} onChange={inputChange}/>
        </div>

        <div className="col">
            <h3 className='text-[14px] mb-1 font-[600]'>Product Brand</h3>
            <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none
             focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='brand' value={formFields.brand} onChange={inputChange}/>
        </div>

        <div className="col">
            <h3 className='text-[14px] mb-1 font-[600]'>Product Stock</h3>
            <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none
             focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='countInStock' value={formFields.countInStock} onChange={inputChange}/>
        </div>

        <div className="col my-1">
        <h3 className='text-[14px] font-[500] mb-2 text-black'>Product Rating</h3>
        <Rating  defaultValue={3.5} precision={0.5} 
         name="simple-controlled"
         value={ratingsValue}
         onChange={(event,newValue)=>{
          setRatingValue(newValue);
          setFormFields(()=>({
            ...formFields,
            rating:newValue
          }))
         }}
        />
      </div>

        </div>

     <div className="img-box">
      <div className="row my-3">
        <div className="col">
          <div className="form-group">
          <h3 className='text-[14px] mb-1 font-[600]'>Product Image</h3>
          <div className="flex items-center gap-3 inputBtn">
          <input type="text" ref={productImages}  className='w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none 
          focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'  name='images' onChange={inputChange}/>
          <Button className='btn-blue' onClick={addProductImages}>Add</Button>
          </div>

          </div>
        </div>
      </div>

      <div className="col w-full p-5 px-0">
      <h3 className='font-[700] text-[15px] mb-3'>Media & Image</h3>

      <div className="grid grid-cols-7 gap-4" id='imgGrid'>
       {
        productImagesArr?.map((image,index)=>{
          return(
            <div className="img" key={index}>
             <img src={image} alt="image" className='w-100 h-[90px]'/>
             <ImCross  className='removee' onClick={() => removeImg(index)}/>
            </div>
          )
        })
       } 
      </div>
    </div>
 </div>

    </div>

 <br />
    <Button type="submit" className="btn-blue btn-lg w-full flex gap-3">
      <FaCloudUploadAlt className='text-[25px] text-white'/>Publish and View</Button>
        </form>
      </section>
    </>
  )
}

export default AddProduct
