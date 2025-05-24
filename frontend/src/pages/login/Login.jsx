import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { MyContext } from '../../App';
import { useContext } from 'react';
import { useState } from 'react';
import { postData } from '../../utils/api';

const Login = () => {
  
  const context=useContext(MyContext);
  const [formfields, setFormfields] = useState({
    email: '',
    password: '',
    isAdmin: false,
  });

  const onchangeInput = (e) => {
    setFormfields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

   const Login = async (e) => {
      e.preventDefault();
  
      if (formfields.email === "") {
          context.setAlertBox({
              open: true,
              error: true,
              msg: "Please enter email!"
          });
          return;
      }
  
      if (formfields.password === "") {
          context.setAlertBox({
              open: true,
              error: true,
              msg: "Please enter password!"
          });
          return;
      }
  
      try {
          const res = await postData("/user/signin", formfields);
          console.log("API Response:", res);
  
          if (res && res.token && res.status!==false) { // ✅ Ensure response and token exist
              // Store token and user data
              localStorage.setItem("authToken", res.token);
  
              const userr={
                  name:res.user?.name,
                  email:res.user?.email,
                  userId:res.user?._id
              }
              localStorage.setItem("EcommerceUser",JSON.stringify(userr));
  
              context.setAlertBox({
                  open: true,
                  error: false,
                  msg: "Login Successfully!"
              });
              context.setUser(userr); 
              context.setIsLogin(true);
              setTimeout(() => {
                  window.location.href = "/";
              }, 2000);
          } else {
              console.log("Login failed: No token received");
              context.setAlertBox({
                  open: true,
                  error: true,
                  msg: "Invalid credentials!"
              });
          }
      } catch (error) {
          console.log("Login error:", error);
          context.setAlertBox({
              open: true,
              error: true,
              msg: "Something went wrong!"
          });
      }
  };

  return (
    <>
      <div className="signin-container">
      <div className="overlay"></div>
      <div className="card p-4 shadow sign-in-card">
      <img src="https://logos-world.net/wp-content/uploads/2023/03/Fashion-Nova-Logo.png" alt="" />
        <h3 className="text-center mb-3 text-dark">Sign In</h3>
       <form onSubmit={Login}>
        {/* Email Input */}
        <div className="mb-3">
          <label className="form-label text-dark">
            Email <span className="text-danger">*</span>
          </label>
          <input type="email" className="form-control" name="email" onChange={onchangeInput} placeholder="Enter your email" />
        </div>

        {/* Password Input */}
        <div className="mb-3">
          <label className="form-label text-dark">
            Password <span className="text-danger">*</span>
          </label>
          <input type="password" className="form-control" name="password" onChange={onchangeInput} placeholder="Enter your password" />
        </div>

        {/* Forgot Password */}
        <div className="text-end mb-3">
          <a href="#" className="text-danger">Forgot password?</a>
        </div>

        {/* Sign In Button */}
        <button className="btn btn-warning w-100">Sign In</button>

        {/* Sign Up Link */}
        <p className="text-center mt-3 text-dark">
          Not Registered? <Link to="/register" className="text-danger">Sign Up</Link>
        </p>
     </form>
        {/* Social Login */}
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
    </>
  )
}

export default Login
