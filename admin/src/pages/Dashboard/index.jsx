import React, { useState ,useEffect,PureComponent, useContext} from 'react';
import DashboardBoxes from '../../components/DashboardBoxes';
import { Button, Checkbox } from '@mui/material';
import { FaPlus, FaChevronDown } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa6';
import { GoTrash } from 'react-icons/go';
// import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { BiExport } from 'react-icons/bi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { myContext } from '../../App';
import { deleteData, fetchDataFromApi } from '../utils/api';
import Rating from '@mui/material/Rating';
import Products from '../Products';

const label = {inputProps:{'aria-label':'Checkbox demo'}}

const Dashboard = () => {

  const [expandedRow, setExpandedRow] = useState(null);
   const [productList,setProductList] = useState([]);
  const [categoryFilterVal,setcategoryFilterVal] = useState('');
  const context = useContext(myContext);
  const [chart1Data,setChart1Data] = useState(
      [
      {
        name: 'JAN',
        TotalSales: 4000,
        TotalUsers: 2400,
        amt: 2400,
      },
      {
        name: 'FEB',
        TotalSales: 3000,
        TotalUsers: 1398,
        amt: 2210,
      },
      {
        name: 'MARCH',
        TotalSales: 2000,
        TotalUsers: 9800,
        amt: 2290,
      },
      {
        name: 'APRIL',
        TotalSales: 2780,
        TotalUsers: 3908,
        amt: 2000,
      },
      {
        name: 'MAY',
        TotalSales: 1890,
        TotalUsers: 4800,
        amt: 2181,
      },
      {
        name: 'JUNE',
        TotalSales: 2390,
        TotalUsers: 3800,
        amt: 2500,
      },
      {
        name: 'JULY',
        TotalSales: 3490,
        TotalUsers: 4300,
        amt: 2100,
      },
      {
        name: 'AUG',
        TotalSales: 3490,
        TotalUsers: 4300,
        amt: 2100,
      },
      {
        name: 'SEP',
        TotalSales: 3490,
        TotalUsers: 4300,
        amt: 2100,
      },
      {
        name: 'OCT',
        TotalSales: 5490,
        TotalUsers: 4300,
        amt: 2100,
      },
      {
        name: 'NOV',
        TotalSales: 3490,
        TotalUsers: 4900,
        amt: 2100,
      },
      {
        name: 'DEC',
        TotalSales: 3490,
        TotalUsers: 4100,
        amt: 2100,
      },
    ]
  );

   const handleChangeCatFilter = (e)=>{
    setcategoryFilterVal(e.target.value);
   }

  // Function to toggle row expansion
  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

    useEffect(() => {
       window.scrollTo(0, 0);
       fetchProducts(); // Call function to fetch products
     }, []);
     
     const fetchProducts = () => {
       context.setProgress(40);
       fetchDataFromApi("/product").then((res) => {
         setProductList(res);
         context.setProgress(100);
       });
     };
     
     const handleClose = () => {
      setOpen(false);
      setFormFields({ name: '', images: [] });
    };
  
    const deleteProduct = (id) => {
      context.setProgress(40);
      deleteData(`/product/${id}`).then((res) => {
        context.setProgress(100);
        context.setAlertBox({
          open: true,
          error: true,
          msg: 'Product Deleted!',
        });
    
        // Update productList state to remove the deleted product
        setProductList((prevList) => ({
          ...prevList,
          products: prevList.products.filter((product) => product._id !== id),
        }));
      });
    };
    


      const handleChange = (event,value) =>{
        context.setProgress(40);
        fetchDataFromApi(`/product?page=${value}`).then((res)=>{
          setProductList(res);
          context.setProgress(100);
        })
      }


  return (
    <>
      <div className="w-full py-2 px-5 p-5 border bg-white border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
        <div className="info">
          <h1 className='text-[35px] font-bold leading-12 mb-3'>Good Morning , <br/>Muskan <span> 👋</span></h1>
          <p>Here's What happening on your company today. See the Progress!</p>
          <Button className='btn-blue !capitalize !my-4' 
          onClick={()=>context.setisOpenFullScreenPanel({
            open:true,
            model:"Add Product"
           })}
          ><FaPlus className='mx-2'/> Add Product </Button>
        </div>
        <img src="https://media.istockphoto.com/id/1996403958/vector/kaizen-process.jpg?s=612x612&w=0&k=20&c=m5Ybg-uCFcRK58AOdHU0FqDxRQ432deSPeHqzimTa3E=" height="200px" width="320px" alt="" />
      </div>
      
      <DashboardBoxes/>

{/* // product table */}

   <Products /> 


{/* //order table  */}
      <div className="card mx-2 my-5 shadow-md sm:rounded-lg bg-white text-gray-900">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[19px] font-[600]">Recent Orders</h2>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3 w-[50px]"></th>
                <th className="px-6 py-3 w-[120px] whitespace-nowrap">ORDER ID</th>
                <th className="px-6 py-3 w-[140px] whitespace-nowrap">PAYMENT ID</th>
                <th className="px-6 py-3 w-[160px] whitespace-nowrap">NAME</th>
                <th className="px-6 py-3 w-[180px] whitespace-nowrap">PHONE NUMBER</th>
                <th className="px-6 py-3 w-[220px] whitespace-nowrap">ADDRESS</th>
                <th className="px-6 py-3 w-[120px] whitespace-nowrap">PINCODE</th>
                <th className="px-6 py-3 w-[140px] whitespace-nowrap">TOTAL AMOUNT</th>
                <th className="px-6 py-3 w-[200px] whitespace-nowrap">EMAIL</th>
                <th className="px-6 py-3 w-[150px] whitespace-nowrap">USER ID</th>
                <th className="px-6 py-3 w-[160px] whitespace-nowrap">ORDER STATUS</th>
                <th className="px-6 py-3 w-[160px] whitespace-nowrap">DATE</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2].map((orderId) => (
                <>
                  <tr key={orderId} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                    <td className="px-6 py-4 w-[50px] text-center">
                      <button
                        onClick={() => toggleRow(orderId)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        <FaChevronDown
                          className={`transition-transform duration-200 ${expandedRow === orderId ? "rotate-180" : ""}`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 w-[120px] text-blue-800 font-[800] whitespace-nowrap">#{orderId}23456</td>
                    <td className="px-6 py-4 w-[140px] text-blue-800 font-[800] whitespace-nowrap">pay_ABC{orderId}23</td>
                    <td className="px-6 py-4 w-[160px] whitespace-nowrap">John Doe</td>
                    <td className="px-6 py-4 w-[180px] whitespace-nowrap">+91 9876543210</td>
                    <td className="px-6 py-4 w-[220px] whitespace-nowrap">123, New Street</td>
                    <td className="px-6 py-4 w-[120px] whitespace-nowrap">560001</td>
                    <td className="px-6 py-4 w-[140px] whitespace-nowrap">$500</td>
                    <td className="px-6 py-4 w-[200px] whitespace-nowrap">john@example.com</td>
                    <td className="px-6 py-4 w-[150px] whitespace-nowrap">user_456</td>
                    <td className="px-6 py-4 w-[160px] text-green-500 whitespace-nowrap">Shipped</td>
                    <td className="px-6 py-4 w-[160px] whitespace-nowrap">2025-02-19</td>
                  </tr>
                  {expandedRow === orderId && (
                    <tr className="bg-gray-100">
                      <td colSpan="12" className="px-6 py-4">
                        <h3 className="text-lg font-semibold mb-2">Products</h3>
                        <table className="w-full text-sm text-left text-gray-700 border border-gray-300">
                          <thead className="bg-gray-200">
                            <tr>
                              <th className="px-4 py-2 w-[100px]">Product ID</th>
                              <th className="px-4 py-2 w-[200px]">Title</th>
                              <th className="px-4 py-2 w-[100px]">Image</th>
                              <th className="px-4 py-2 w-[100px]">Quantity</th>
                              <th className="px-4 py-2 w-[100px]">Price</th>
                              <th className="px-4 py-2 w-[120px]">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t border-gray-300">
                              <td className="px-4 text-blue-800 font-[800] py-2">P00{orderId}</td>
                              <td className="px-4 py-2">Sample Product {orderId}</td>
                              <td className="px-4 py-2">
                                <img src="https://via.placeholder.com/50" alt="Product" className="w-12 h-12 rounded" />
                              </td>
                              <td className="px-4 py-2">2</td>
                              <td className="px-4 py-2">$50</td>
                              <td className="px-4 py-2">$100</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

  <div className="card my-4 shadow-md sm:rounded-lg bg-white">
    <h2 className='text-[18px] font-[600] px-5 py-5'>Total Users & Total Sales</h2>
    <div className="flex items-center gap-5 px-5 py-5 pt-1 text-[15px]">
    <span className="flex items-center gap-1">
      <span className='block w-[8px] h-[8px] rounded-full bg-green-600'></span>
      Total Users
      </span>
      <span className="flex items-center gap-1">
      <span className='block w-[8px] h-[8px] rounded-full bg-blue-600'></span>
      Total Sales
      </span>
    </div>
        <LineChart
          width={1000}
          height={500}
          data={chart1Data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke='none' />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="TotalUsers" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="TotalSales" stroke="#82ca9d" strokeWidth={3}/>
        </LineChart>
  </div>

    </>
  );
};

export default Dashboard;
