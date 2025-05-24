import { Button, FormControlLabel } from '@mui/material'
import React,{useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CgLogIn } from 'react-icons/cg'
import { FaRegUser } from 'react-icons/fa'

const Forgot = () => {
   
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
       <img className='w-full fixed top-0 left-0 opacity-5' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9PpJj2oHtiLkjwNel6qkS7ertBBUPHN6XMQ&s" alt="" />

       <div className="loginBox card w-[600px] h-auto pb-20 mx-auto pt-20 relative z-50">
        <div className="text-center">
       <img height="100px" width="100px" className='m-auto' src="https://static.vecteezy.com/system/resources/previews/009/481/029/non_2x/geometric-icon-logo-geometric-abstract-element-free-vector.jpg" alt="" />
       </div>
       <h1 className="text-center mt-4 text-[35px] font-[800]">
        Having trounle to Sign In? <br/>
        Reset Your Password
        </h1>
        <br />

        <div className="w-full flex items-center justify-center gap-3">
            <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
             <span className='text-[14px] font-[500]'>Or, Sign in with your email</span>
            <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
        </div>
<br />
        <form className='w-full px-8 mt-3'>
        <div className="form-group mb-4 w-full">
            <h4 className='text-[14px] font-[500] mb-1'>Email</h4>
            <input type="email" placeholder='Enter your email' className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3' />
        </div>
       
        <Button className='btn-blue bg-black btn-lg w-full'>Reset Password</Button>
        <div className="text-center my-3">
            <span>Don't want to reset?  </span>
                <Link to="/forgotpassword" className='text-primary font-[700] text-[15px] hover:underline '>Sign In?</Link>
        </div>
        </form>
       </div>
      </section>
    </>
  )
}

export default Forgot
