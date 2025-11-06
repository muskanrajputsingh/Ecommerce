import React, { useState,useEffect, useContext } from 'react'
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FaShoppingCart } from "react-icons/fa";
import { fetchDataFromApi } from '../../utils/api';
import './Checkout.css';
import { MyContext } from '../../App';

const Checkout = () => {
    const [countries, setCountries] = useState([]);
    const [cartData, setCartData] = useState([]); 
   const context = useContext(MyContext);

    useEffect(() => {
        fetchDataFromApi('/cart')
          .then((res) => {
            console.log("Cart Data from API:", res); // Debugging output
            if (Array.isArray(res)) {
              setCartData(res);
            } else {
              setCartData([]); // ✅ Fallback if data is not an array
            }
          })
          .catch(error => {
            console.error("Error fetching cart data:", error);
            setCartData([]); // ✅ Ensuring the app does not crash
          });
      }, []);

    const [formfields,setFormfields]=useState({
        fullname:"",
        country:"INDIA",
        streetAddressLine1:"",
        streetAddressLine2:"",
        state:"",
        city:"",
        zipcode:"",
        phone:"",
        email:""
    })

    const onChangeInput=(e)=>{
        setFormfields({
            ...formfields,
            [e.target.name]:e.target.value
        })
    }

    // useEffect(() => {
    //     fetch('https://restcountries.com/v2/all')
    //       .then((response) => response.json())
    //       .then((data) => {
    //         if (data && Array.isArray(data)) {
    //           setCountries(data);
    //         //   console.log(data);
    //         }
    //       })
    //       .catch((error) => {
    //         console.error('Error fetching countries:', error);
    //       });
    //   }, []);

      const checkout=(e)=>{
      e.preventDefault();
      console.log(formfields);
      if(formfields.fullname===""){
        context.setAlertBox({
            open:true,
            error:true,
            msg:"Please enter fullname"
        })
        return false;
      }
      if(formfields.country===""){
        context.setAlertBox({
            open:true,
            error:true,
            msg:"Please enter Country"
        })
        return false;
      }
      if(formfields.streetAddressLine1===""){
        context.setAlertBox({
            open:true,
            error:true,
            msg:"Please enter Street Address"
        })
        return false;
      }
      if(formfields.state===""){
        context.setAlertBox({
            open:true,
            error:true,
            msg:"Please enter State"
        })
        return false;
      }
      if(formfields.city===""){
        context.setAlertBox({
            open:true,
            error:true,
            msg:"Please enter City"
        })
        return false;
      }
      if(formfields.email===""){
        context.setAlertBox({
            open:true,
            error:true,
            msg:"Please enter Email Address"
        })
        return false;
      }
      if(formfields.zipcode===""){
        context.setAlertBox({
            open:true,
            error:true,
            msg:"Please enter Zipcode"
        })
        return false;
      }
      if(formfields.phone===""){
        context.setAlertBox({
            open:true,
            error:true,
            msg:"Please enter Phone Number"
        })
        return false;
      }

     const addressInfo={
        name:formfields.fullname,
        phone:formfields.phone,
        address:formfields.streetAddressLine1 + formfields.streetAddressLine2,
        pincode:formfields.zipcode,
        date:new Date().toLocaleString(
            "en-US",
            {
                month:"short",
                day:"2-digit",
                year:"numeric",
            }
        )
     }

      }

  return (
    <>
      <section className='section'>
       <div className="container">
        <form className='checkoutform' onSubmit={checkout}>
        <div className="row">
            <div className="col-md-7">
                <h5 className='hd fw-800 py-2'>BILLING DETAILS</h5>

                <div className="row mt-3">
                    <div className="col-md-6">
                        <div className="form-group">
                        <TextField label="Full Name *" variant="outlined" className='w-100' size='small' name="fullname"
                         onChange={onChangeInput}/>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                  <FormControl fullWidth className="inps">
                  <InputLabel id="country-label">Country *</InputLabel>
                  <Select
                    labelId="country-label"
                    name="country"
                    value={formfields.country}
                    onChange={onChangeInput}
                    size="small"
                  >
                    {countries.length > 0 ? (
                      countries.map((c) => (
                        <MenuItem key={c.alpha2Code} value={c.name}>
                          {c.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="INDIA">INDIA</MenuItem> // default fallback
                    )}
                  </Select>
                </FormControl>

                        </div>
                    </div>

                    </div>

                   <h6>Street address *</h6> 

                   <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="form-group">
                        <TextField label="House number and Street Name" variant="outlined" className='w-100' size='small'
                       name="streetAddressLine1" onChange={onChangeInput} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                        <TextField label="Apartment,suite,flat etc.(optional)" variant="outlined" className='w-100' size='small'
                         name="streetAddressLine2" onChange={onChangeInput}/>
                        </div>
                    </div>
                   </div>

                   <h6>State *</h6> 

                        <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="form-group">
                            <TextField label="State" variant="outlined" className='w-100' size='small'  name="state" onChange={onChangeInput}/>
                            </div>
                        </div>
                        </div>

                   <h6>Town / City *</h6> 

                        <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="form-group">
                            <TextField label="City" variant="outlined" className='w-100' size='small'  name="city" onChange={onChangeInput}/>
                            </div>
                        </div>
                        </div>

                        <h6>Pincode / ZIP *</h6> 

                        <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="form-group">
                            <TextField label="PinCode" variant="outlined" className='w-100' size='small'  name="zipcode" onChange={onChangeInput}/>
                            </div>
                        </div>
                        </div>

                        <h6>Contact *</h6> 

                        <div className="row mt-4">
                        <div className="col-md-6">
                            <div className="form-group">
                            <TextField label="Phone Number" variant="outlined" className='w-100' size='small'  name="phone" onChange={onChangeInput}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                            <TextField label="Email Address" variant="outlined" className='w-100' size='small'  name="email" onChange={onChangeInput}/>
                            </div>
                        </div>
                        </div>

                    </div>

       <div className="col-md-5">
        <div className="card orderinfo">
         <h5>YOUR ORDER</h5>
         <div className="table-responsive mt-3">
            <table className='table table-borderless'>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Subtotal</th>
                </tr>
            </thead>

           <tbody>
           
           {
            cartData?.length !==0 && cartData?.map((item,index)=>{
                return(
                    <tr key={index}>
                    <td><img src={item.image} height="50px" width="50px" alt="" /></td>
                    <td>{item.productTitle} <b>&nbsp; ⤬ {item.quantity}</b></td>
                    <td> ₹ {item.price}</td>
                </tr>
                )
            })
           }

            <tr>
                <td>Subtotal</td>
                <td>Total amount to pay 💵</td>
                <td> ₹ {
                    cartData.length!==0 && cartData.map(item=>parseInt(item.price)*item.quantity).reduce((total,value)=>
                    total+value,0)
                  }</td>
            </tr>

           </tbody>

            </table>
         </div>
   
         <button type='submit' className="btn btn-danger w-100 mt-3"> Checkout &nbsp;<FaShoppingCart className='pb-1 text-2xl"'/></button>

        </div>
       </div>

        </div>
        </form>
       </div>
      </section>
    </>
  )
}

export default Checkout
