import React, { useState ,PureComponent, useContext} from 'react';
import {  FaChevronDown } from 'react-icons/fa6';
import Searchbox from '../../components/Searchbox';


const Orders = () => {
     const [expandedRow, setExpandedRow] = useState(null);

     // Function to toggle row expansion
  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };
  return (
    <>
      <div className="card mx-2 my-5 shadow-md sm:rounded-lg bg-white text-gray-900">
              <div className="flex items-center justify-between px-5 py-5">
                <h2 className="text-[19px] font-[600]">Recent Orders</h2>
               <div className='w-[50%]'> <Searchbox/></div>
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
    </>
  )
}

export default Orders
