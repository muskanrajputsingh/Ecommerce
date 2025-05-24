import React, { useContext, useState } from 'react'
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { fetchDataFromApi, postData } from '../utils/api';
import { myContext } from '../../App';

const AddCategory = () => {
  const [formFields,setFormFields]=useState({
    name:'',
    images:[],
  });

  const changeInput=(e)=>{
    setFormFields(()=>(
      {
        ...formFields,
        [e.target.name]:e.target.value
      }
    ))
  }
   
  const context=useContext(myContext)

  // const addCategory = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await postData('/category', formFields);
  //     console.log(response);
  //     alert("Category submitted");
  //     setFormFields({ name: '', images: [] });
  //   } catch (error) {
  //     context.setAlertBox({
  //       open:true,
  //       error:true,
  //       msg:'Please fill all the details'
  //     });
  //     return false;
  //   }
  // };
  
  const addCategory = async (e) => {
    e.preventDefault();
    console.log("✅ addCategory function called!");

    if (!formFields.name || !formFields.images.length) {
      console.log("🚨 Missing fields detected!");
      context.setAlertBox({
        open: true,
        error: true,
        msg: 'Please fill all the details'
      });
      return; // Stop execution if fields are missing
    }

    try {
      console.log("🔄 Sending data:", formFields);
      const response = await postData('/category', formFields);
      console.log("✅ Server response:", response);
      context.setAlertBox({
        open: true,
        error: false,
        msg: 'Category submitted successfully!'
      });
      setFormFields({ name: '', images: [] });

      setTimeout(() => {
        window.location.href = "/category/list";
      }, 1000);

    } catch (error) {
      console.log("❌ Error submitting category:", error);
      context.setAlertBox({
        open: true,
        error: true,
        msg: 'Error submitting category'
      });
    }
};


  return (
    <>
      <section className="p-6 !bg-gray-50">

        <form className='form p-8 py-3'>
            <div className="scroll max-h-[70vh] overflow-y-scroll pt-4">
              <div className="grid grid-cols-1 mb-3">
                <div className="col w-[85%]">
                  <h3 className='text-[17px] font-[800px] mb-1 text-black'>Category Name</h3>
                  <input 
                    type="text" 
                    className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm" 
                    name="name" 
                    required
                    value={formFields.name} 
                    onChange={changeInput} 
                  />
                </div>
              </div>

              <br />

              <div className="col mb-4">
              <h3 className='text-[18px] font-[500px] mb-1 text-black'>Category Image Url</h3>
              <input 
                  type="text" 
                  className="h-[40px] border border-[rgba(0,0,0,0.3)] !w-[85%] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm" 
                  name="images" 
                  required
                  value={formFields.images}  // Bind value
                  onChange={changeInput} 
                />
              </div>
           
            </div>
           
             <br />
             <br />
             <div className='w-[250px]'>
                <Button type="submit" className="btn-blue btn-lg w-full flex gap-3" onClick={addCategory}>
                <FaCloudUploadAlt className='text-[25px] text-white'/>Publish and View</Button>
            </div>
            </form>
            </section>
    </>
  )
}

export default AddCategory
