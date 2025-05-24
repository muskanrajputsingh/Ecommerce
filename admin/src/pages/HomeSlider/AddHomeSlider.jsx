import React from 'react'
import UploadBox from '../../components/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IoMdClose } from 'react-icons/io';
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from 'react-icons/fa';
const AddHomeSlider = () => {
  return (
    <>
      <section className="p-6 !bg-gray-50">
        <form className='form p-8 py-3'>
            <div className="scroll max-h-[70vh] overflow-y-scroll pt-4">
            <div className="grid grid-cols-7 gap-4">
        
        <div className="uploadBoxWrapper relative">
            <span className='absolute w-[20px] h-[22px] rounded-full overflow-hidden bg-red-700  -top-[5px] -right-[5px] flex items-center cursor-pointer justify-center z-50'><IoMdClose className='text-white text-[17px] cursor-pointer' /></span>
      <div className="uploadBox !p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%]
        bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">

         <LazyLoadImage
         className='w-full h-full object-cover'
          alt={"image"}
          src={'https://cdn-imgix.headout.com/media/images/c9db3cea62133b6a6bb70597326b4a34-388-dubai-img-worlds-of-adventure-tickets-01.jpg?auto=format&w=1222.3999999999999&h=687.6&q=90&fit=crop&ar=16%3A9&crop=faces'}
         />
        </div>
        </div>

        <UploadBox multiple={true} />
    
           </div>
            </div>
           
             <br />
             <br />
             <div className='w-[250px]'>
                <Button type="button" className="btn-blue btn-lg w-full flex gap-3">
                <FaCloudUploadAlt className='text-[25px] text-white'/>Publish and View</Button>
            </div>
            </form>
            </section>
    </>
  )
}

export default AddHomeSlider
