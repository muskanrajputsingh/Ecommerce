import React, { useContext } from 'react'
import Pagination from '@mui/material/Pagination';
import { BiExport } from 'react-icons/bi';
import { Button, Checkbox } from '@mui/material';
import { FaPlus, FaChevronDown } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa6';
import { GoTrash } from 'react-icons/go';
import { useState } from 'react';
import { myContext } from '../../App';
const label = {inputProps:{'aria-label':'Checkbox demo'}}

const HomeSlider = () => {
     const [categoryFilterVal,setcategoryFilterVal] = useState('');
    
       const handleChangeCatFilter = (e)=>{
        setcategoryFilterVal(e.target.value);
       }

  const context = useContext(myContext);

  return (
    <>
    
      <div className="flex items-center justify-between px-4 py-3 mt-3">
          <h2 className="text-[19px] font-[700]">Home Sliders Banners</h2>

          <div className="col w-[27%] ml-auto flex items-center gap-3">
          <Button className="btn-blue !bg-green-600 btn-sm flex items-center"><BiExport className='text-[20px] pr-1 pb-1'/> Export</Button>
          <Button className="btn-blue !bg-blue-600 btn-sm" onClick={()=>context.setisOpenFullScreenPanel({
           open:true,
           model:'Add Home Slide'
          })}>
            <FaPlus className='text-[20px] pr-1 pb-1'/> Add Slides</Button>
        </div>

        </div>

<div className="card mx-2 my-5 shadow-md sm:rounded-lg bg-white text-gray-900">
<div className="relative overflow-x-auto">
  <table className="w-full text-sm text-left text-gray-700">
    <thead className="text-xs uppercase bg-gray-50">
      <tr>
        <th className="px-6 py-3 w-[50px]"><Checkbox {...label} size='small' /></th>
        <th className="px-6 py-3  whitespace-nowrap">Image</th>
        <th className="px-6 py-3  whitespace-nowrap">Action</th>
      </tr>
    </thead>

    {/* Keep all rows inside a single tbody */}
    <tbody>
      {[1, 2, 3].map((_, index) => (
        <tr key={index} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
          <td className="px-6 py-3 w-[50px]"><Checkbox {...label} size='small' /></td>

          <td className="px-6 py-2">
            <div className="flex items-center gap-4 w-[220px]">
              <div className="img w-full h-[100px] rounded-md overflow-hidden group">
                <Link to="/product/45745">
                  <img src="https://t3.ftcdn.net/jpg/01/38/94/62/360_F_138946263_EtW7xPuHRJSfyl4rU2WeWmApJFYM0B84.jpg" alt=""
                    className='w-full group-hover:scale-105 transition-all'
                  />
                </Link>
              </div>
            </div>
          </td>
 
          <td className="px-6 py-2">
            <div className="flex items-center gap-1">
             
                <Button className='!w-[35px] !h-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:bg-[#b0b0b0] bg-[#f1f1f1] !min-w-[35px]'>
                  <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                </Button>
              
                <Button className='!w-[35px] !h-[35px] !rounded-full !border !border-[rgba(0,0,0,0.4)] hover:bg-[#b0b0b0] bg-[#f1f1f1]' style={{ minWidth: '35px' }}>
                  <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                </Button>
             
                <Button className='!w-[35px] !h-[35px] !border !rounded-full !border-[rgba(0,0,0,0.4)] hover:bg-[#b0b0b0] bg-[#f1f1f1]' style={{ minWidth: '35px' }}>
                  <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                </Button>
             
            </div>
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

export default HomeSlider
