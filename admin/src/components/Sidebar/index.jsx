import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {RxDashboard} from "react-icons/rx";
import { FaRegImage } from "react-icons/fa6";
import { ImUsers } from "react-icons/im";
import { FaProductHunt } from "react-icons/fa6";
import { IoBagCheckSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { FaAngleDown } from 'react-icons/fa';
import { Collapse } from 'react-collapse';
import { myContext } from '../../App';

const Sidebar = () => {
    const [submenuIndex,setSubmenuIndex] = useState(null);
    const isOpenSubMenu=(index)=>{
        if(submenuIndex===index){
            setSubmenuIndex(null)
        }else{
            setSubmenuIndex(index)
        }
    }
    const context = useContext(myContext);

  return (
    <div className={`sidebar fixed top-0 left-0 bg-[#fafafa] h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-4 transition-all duration-300`}>
  <div className="py-2 w-full">
    <Link to="/"><img src="https://logos-world.net/wp-content/uploads/2023/03/Fashion-Nova-Logo.png" className='w-[180px]' alt="" /></Link>
  </div>
 
    <ul className='mt-4'>
        <li>
            <Link to="/dashboard">
            <Button className='w-full !capitalize !justify-start flex gap-3 text-[16px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#f1f1f1]'>
            <RxDashboard className='text-[18px]'/><span>Dashboard</span></Button>
            </Link>
        </li>

            <li><Button onClick={()=>isOpenSubMenu(1)} className='w-full !capitalize justify-start flex gap-3 text-[16px] !text-[rgba(0,0,0,0.8)] !font-[600]  !py-2 hover:!bg-[#f1f1f1]'>
            <FaRegImage className='text-[18px]'/><span>Home Slides</span>
            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'><FaAngleDown className={`transition-all ${submenuIndex===1 ? 'rotate-180' : ''}`}/></span></Button>
           <Collapse isOpened={submenuIndex===1 ? true : false}>
            <ul className='w-full'>
            <Link to="/homeslider/list">
            <li className='w-full'>
            <Button className='!text-[rgba(0,0,0,0.7)] !capitalize flex !justify-start items-center  !w-full !text-[13px] !font-[500] !pl-9  gap-3'><span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'>
            </span>Home Banner slide List</Button></li>
            </Link>
          
           <li className='w-full'>
            <Button className='!text-[rgba(0,0,0,0.7)] !capitalize flex !justify-start items-center  !w-full !text-[13px] !font-[500] !pl-9  gap-3'
            onClick={()=>context.setisOpenFullScreenPanel({
                open:true,
                model:'Add Home Slide'
               })}>
                <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>Add Banner slide List</Button>
                </li>
            </ul>
           </Collapse>
            </li>

            <li>
                <Link to="/users">
                <Button className='w-full !capitalize !justify-start flex gap-3 text-[16px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#f1f1f1]'>
                <ImUsers className='text-[20px]'/><span>Users</span></Button>
                </Link>
                </li>

            <li><Button onClick={()=>isOpenSubMenu(3)} className='w-full !capitalize !justify-start flex gap-3 text-[16px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#f1f1f1]'>
            <FaProductHunt className='text-[18px]'/><span>Products</span>
            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'><FaAngleDown className={`transition-all ${submenuIndex===3 ? 'rotate-180' : ''}`}/></span></Button>
           <Collapse isOpened={submenuIndex===3 ? true : false}>
            <ul className='w-full'>
           <li className='w-full'>
            <Link to="/products">
            <Button className='!text-[rgba(0,0,0,0.7)] !capitalize  flex !justify-start items-center  !w-full !text-[13px] !font-[500] !pl-9 gap-3'>
            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>Product List</Button>
            </Link>
            </li>
           <li className='w-full'>
          <Button className='!text-[rgba(0,0,0,0.7)] !capitalize flex !justify-start items-center  !w-full !text-[13px] !font-[500] !pl-9 
           gap-3' onClick={()=>context.setisOpenFullScreenPanel({
            open:true,
            model:"Add Product"
           })}>
            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>Product Upload</Button>
            </li>
            </ul>
           </Collapse>
            </li>

            <li><Button onClick={()=>isOpenSubMenu(4)} className='w-full !capitalize !justify-start flex gap-3 text-[16px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#f1f1f1]'>
            <FaProductHunt className='text-[18px]'/><span>Category</span>
            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'><FaAngleDown className={`transition-all ${submenuIndex===4 ? 'rotate-180' : ''}`}/></span></Button>
           <Collapse isOpened={submenuIndex===4 ? true : false}>
            <ul className='w-full'>

           <li className='w-full'>
            <Link to="/category/list">
            <Button className='!text-[rgba(0,0,0,0.7)] !capitalize flex !justify-start items-center  !w-full !text-[13px] !font-[500] !pl-9  gap-3'>
            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>View Categories</Button>
            </Link>
           </li>
           <li className='w-full'>
            <Button className='!text-[rgba(0,0,0,0.7)] !capitalize  flex !justify-start items-center  !w-full !text-[13px] !font-[500] !pl-9 gap-3'
            onClick={()=>context.setisOpenFullScreenPanel({
                open:true,
                model:'Add New Category'
               })}>
            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>Add Category</Button>
            </li>
            <li className='w-full'>
            <Button className='!text-[rgba(0,0,0,0.7)] !capitalize flex !justify-start items-center  !w-full !text-[13px] !font-[500] !pl-9  gap-3'
            onClick={()=>context.setisOpenFullScreenPanel({
                open:true,
                model:'Add Sub Category'
               })}>
            <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>Add Sub Categories</Button>
            </li>
            <li className='w-full'>
                <Link to="/subcategory/list">
                <Button className='!text-[rgba(0,0,0,0.7)] !capitalize flex !justify-start items-center  !w-full !text-[13px] !font-[500] !pl-9  gap-3'>
                <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>View Sub Categories</Button>
                </Link>
            </li>
            </ul>
           </Collapse>
            </li>

            <li>
                <Link to="/orders">
            <Button className='w-full !capitalize !justify-start flex gap-3 text-[16px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#f1f1f1]'>
            <IoBagCheckSharp className='text-[19px]'/><span>Orders</span></Button>
                </Link>
            </li>

            <li>
                <Link to="/">
                <Button className='w-full !capitalize !justify-start flex gap-3 text-[16px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#f1f1f1]'>
               <IoMdLogOut className='text-[21px]'/><span>Logout</span></Button>
                </Link>
            </li>
    </ul>
    </div>
  )
}

export default Sidebar;
