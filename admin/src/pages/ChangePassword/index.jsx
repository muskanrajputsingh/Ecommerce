import { Button, FormControlLabel } from '@mui/material'
import React,{useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CgLogIn } from 'react-icons/cg'
import { FaRegUser } from 'react-icons/fa'
import { FaRegEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'

const ChangePassword = () => {
        const [isPasswordShow,setisPasswordShow]=useState(false);
        const [isPasswordShow2,setisPasswordShow2]=useState(false);

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
        Welcome Back ! <br/>
        You can change your Password
        </h1>
        <br />

<br />
        <form className='w-full px-8 mt-3'>

        <div className="form-group mb-4 w-full">
                   <h4 className='text-[14px] font-[500] mb-1'> New Password</h4>
               <div className="relative w-full">
               <input type={isPasswordShow===false?'password' : 'text'} className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3' />
               <Button className='!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[40px] !text-[#000]' onClick={()=>setisPasswordShow(!isPasswordShow)}>
                   {
                       isPasswordShow===false ?  (<FaRegEye className='text-[16px]' /> ): (<FaEyeSlash className='text-[16px]' />)
                   }
              </Button>
               </div>
        </div>

               <div className="form-group mb-4 w-full">
                   <h4 className='text-[14px] font-[500] mb-1'> Confirm Password</h4>
               <div className="relative w-full">
               <input type={isPasswordShow2===false?'password' : 'text'} className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3' />
               <Button className='!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[40px] !text-[#000]' onClick={()=>setisPasswordShow2(!isPasswordShow2)}>
                   {
                       isPasswordShow2 ===false ?  (<FaRegEye className='text-[16px]' /> ): (<FaEyeSlash className='text-[16px]' />)
                   }
              </Button>
               </div>
               </div>
       
        <Button className='btn-blue bg-black btn-lg w-full'>Change Password</Button>
        </form>
       </div>
      </section>
    </>
  )
}

export default ChangePassword
