import { Button, FormControlLabel } from '@mui/material'
import React,{useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CgLogIn } from 'react-icons/cg'
import { FaRegUser } from 'react-icons/fa'

const Verify = () => {
  return (
    <>
       <section className=" bg-white w-full h-[100vh]">
        <header className='fixed top-0 left-0 w-full px-4 py-2 flex items-center justify-between z-50'>
        <Link to="/">
        <img className='w-[200px]' src="https://logos-world.net/wp-content/uploads/2023/03/Fashion-Nova-Logo.png" alt="" />
        </Link>

        <div className="flex items-center gap-0">
            <Link to="/login" exact={true} activeClassName="isActive">
            <Button className="rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-2 bg-amber-700">
            <CgLogIn className='text-[18px]'/> Login
            </Button>
            </Link>

            <Link to="/signup" exact={true} activeClassName="isActive">
            <Button className="rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-2">
            <FaRegUser className='text-[18px]'/> Sign Up
            </Button>
            </Link>
    
        </div>

        </header>
       <img className='w-full fixed top-0 left-0 opacity-5' src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/check.png" alt="" />

       <div className="loginBox card w-[600px] h-auto pb-20 mx-auto pt-20 relative z-50">
        <div className="text-center">
       <img height="70px" width="90px" className='m-auto' src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/check.png" alt="" />
       </div>
       <h1 className="text-center mt-4 text-[35px] font-[800]">
        Welcome Back <br/>
        Please Verify your Email
        </h1>
        <br />       
 <div className="text-center flex items-center justify-center flex-col">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <div class="flex justify-center mb-4">
            <img src="https://cdn-icons-png.flaticon.com/512/10303/10303003.png" alt="Shield Icon" class="w-12" />
        </div>
        <h2 class="text-xl font-semibold">Verify OTP</h2>
        <p class="text-gray-600 text-sm mt-2">OTP sent to <span class="text-red-500 font-medium">rinkuv37@gmail.com</span></p>
        
        <div class="flex justify-center gap-2 my-4">
            <input type="text" maxlength="1" class="w-10 h-10 border-2 rounded-md text-center text-xl focus:border-blue-500 outline-none" />
            <input type="text" maxlength="1" class="w-10 h-10 border-2 rounded-md text-center text-xl focus:border-blue-500 outline-none" />
            <input type="text" maxlength="1" class="w-10 h-10 border-2 rounded-md text-center text-xl focus:border-blue-500 outline-none" />
            <input type="text" maxlength="1" class="w-10 h-10 border-2 rounded-md text-center text-xl focus:border-blue-500 outline-none" />
            <input type="text" maxlength="1" class="w-10 h-10 border-2 rounded-md text-center text-xl focus:border-blue-500 outline-none" />
            <input type="text" maxlength="1" class="w-10 h-10 border-2 rounded-md text-center text-xl focus:border-blue-500 outline-none" />
        </div>
        
        <button class="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300">VERIFY OTP</button>
    </div>
       </div>

       </div>
      </section>
    </>
  )
}

export default Verify
