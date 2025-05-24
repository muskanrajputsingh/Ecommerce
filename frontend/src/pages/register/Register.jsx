import React from "react";
import { Link } from "react-router-dom";
import "./Register.css"; 
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";
import { useContext } from "react";

const Register = () => {
  const context=useContext(MyContext);
  const [formfields,setFormfields]=useState({
    name:"",
    email:"",
    phone:"",
    password:"",
    isAdmin:false
})

const onchangeInput=(e)=>{
  setFormfields(()=>({
     ...formfields,
     [e.target.name]:e.target.value
  }))
 }

const signUp = async (event) => {
  event.preventDefault();

  try {
      if (!formfields.name) {
          context.setAlertBox({ open: true, error: true, msg: "Please enter name!" });
          return;
      }

      if (!formfields.email) {
          context.setAlertBox({ open: true, error: true, msg: "Please enter email!" });
          return;
      }

      if (!formfields.phone) {
          context.setAlertBox({ open: true, error: true, msg: "Please enter phone!" });
          return;
      }

      if (!formfields.password) {
          context.setAlertBox({ open: true, error: true, msg: "Please enter password!" });
          return;
      }

      // Call API and wait for the response
      const res = await postData("/user/signup", formfields);

      console.log("Signup Response:", res); // Debugging to see response

      if (res?.token) { // ✅ Fix: Check for token instead of `success`
          context.setAlertBox({ open: true, error: false, msg: "Registered Successfully!" });

          setTimeout(() => {
              window.location.href = "/login";
          }, 2000);
      } else {
          let errorMsg = res?.msg || "Registration failed!";
          if (res?.error === "USER_ALREADY_EXISTS") {
              errorMsg = "User already exists. Please login.";
          }

          context.setAlertBox({ open: true, error: true, msg: errorMsg });
      }

  } catch (err) {
      console.error("Signup Error:", err);
      context.setAlertBox({ open: true, error: true, msg: "User already exists. Please login." });
  }
};


  return (
    <div className="register-page">
      <div className="register-container">
        <img src="https://logos-world.net/wp-content/uploads/2023/03/Fashion-Nova-Logo.png" alt="" />
        <h2 className="text-center">Sign Up</h2>
        <form onSubmit={signUp}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" className="form-control" name="name" onChange={onchangeInput} placeholder="Enter full name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" name="email" onChange={onchangeInput} placeholder="Enter Email" />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="number" className="form-control" name="phone" onChange={onchangeInput} placeholder="Enter Phone No" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name="password" onChange={onchangeInput} placeholder="Enter Password"/>
          </div>
          <button type="submit" className="btn btn-warning btn-block">Sign Up</button>
          <p className="text-center mt-3">
            Already have an account? <Link style={{color:"#b71c1c"}} to="/login">Sign In</Link>
          </p>
        </form>
        <div className="social-login">
                          <p>Or continue with social account</p>  
            </div>
            <div className="btn-part">
            <button className="google-signin-btn">
                          <FaGoogle className="google-icon" />
                        <Link to="/login">Sign in with Google</Link>
              </button>
            </div>
      </div>
    </div>
  );
};

export default Register;
