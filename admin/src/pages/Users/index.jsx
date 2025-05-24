import React, { useContext } from 'react'
import Pagination from '@mui/material/Pagination';
import { Button, Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Searchbox from '../../components/Searchbox';
import { myContext } from '../../App';
const label = {inputProps:{'aria-label':'Checkbox demo'}}
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { MdLocalPhone } from 'react-icons/md';
import {SlCalender} from "react-icons/sl";

const Users = () => {
     const [categoryFilterVal,setcategoryFilterVal] = useState('');
    
       const handleChangeCatFilter = (e)=>{
        setcategoryFilterVal(e.target.value);
       }

  const context = useContext(myContext);

  return (
    <>
    
     <div className="card mx-2 my-5 shadow-md sm:rounded-lg bg-white text-gray-900">

        <div className="flex items-center py-2 px-5 w-full justify-between pr-5">
            <div className="col">
            <h2 className="text-[19px] font-[700]">Users List</h2>
            </div>
{/* searchbox */}
         <div className="col ml-auto w-[40%]">
        <Searchbox />
         </div>

        </div>

<div className="relative overflow-x-auto">
  <table className="w-full text-sm text-left text-gray-700">
    <thead className="text-xs uppercase bg-gray-50">
      <tr>
        <th className="px-6 py-3 w-[50px]"><Checkbox {...label} size='small' /></th>
        <th className="px-6 py-3 w-[120px] whitespace-nowrap">User Image</th>
        <th className="px-6 py-3 w-[140px] whitespace-nowrap">User Name</th>
        <th className="px-6 py-3 w-[160px] whitespace-nowrap">User Email</th>
        <th className="px-6 py-3 w-[220px] whitespace-nowrap">User Phone No</th>
        <th className="px-6 py-3 w-[220px] whitespace-nowrap">Created</th>
      </tr>
    </thead>

    {/* Keep all rows inside a single tbody */}
    <tbody>
      {[1, 2, 3].map((_, index) => (
        <tr key={index} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
          <td className="px-6 py-3 w-[50px]"><Checkbox {...label} size='small' /></td>

          <td className="px-6 py-2">
            <div className="flex items-center gap-4 w-[70px]">
              <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                <Link to="/product/45745">
                  <img src="https://media.istockphoto.com/id/1996403958/vector/kaizen-process.jpg?s=612x612&w=0&k=20&c=m5Ybg-uCFcRK58AOdHU0FqDxRQ432deSPeHqzimTa3E=" alt=""
                    className='w-full group-hover:scale-105 transition-all'
                  />
                </Link>
              </div>
            </div>
          </td>

          <td className="px-6 py-2">Rohan Sharma</td>
          <td className="px-6 py-2">
            <span className='flex items-center gap-2'>
                <MdOutlineMarkEmailRead/>
                rohan12@gmail.com
            </span>
          </td>
          <td className="px-6 py-2">
          <span className='flex items-center gap-2'>
                <MdLocalPhone/>
                +91-9872991098
         </span>
        </td>  

        <td className="px-6 py-2">
          <span className='flex items-center gap-2'>
                <SlCalender/>
                22-02-2025
         </span>
        </td> 

        </tr>
      ))}
    </tbody>
  </table>
   </div>
     <div className="flex items-center justify-end mt-4 pb-5 px-4">
     <Pagination count={10} color='primary'/>
     </div>
      </div>


    </>
  )
}

export default Users
