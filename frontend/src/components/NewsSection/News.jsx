import React from 'react'
import "./News.css";
import Button from '@mui/material/Button';
import { IoMailOutline } from "react-icons/io5";
const News = () => {
  return (
    <>
    <div className="newsSection mt-4  d-flex align-items-center">
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5">
                <p className='text-white mb-1'>$500 OFF on your first Purchase</p>
                <h3 className='text-white'>Join our newsletter and get...</h3>
                <p className='text-light'>Join our email subscription now to get updates on <br />promotions and coupons.</p>

                <form>
                <IoMailOutline />
                    <input type="text" placeholder='Enter your text...'/>
                    <Button>Subscribe</Button>
                </form>

                </div>
                <div className="col-md-6">
                 <img src="https://img.freepik.com/free-photo/positive-wonderful-woman-trench-red-beret-showing-peace-signs-beige-isolated-background-beautiful-lady-stylish-clothes-is-smiling_197531-18684.jpg" alt="" />
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default News
