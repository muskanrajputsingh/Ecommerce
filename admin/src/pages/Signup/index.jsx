import { Button, FormControlLabel } from '@mui/material'
import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { CgLogIn } from 'react-icons/cg'
import { FaRegUser } from 'react-icons/fa'
import LoadingButton from '@mui/lab/LoadingButton';
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import Checkbox from '@mui/material/Checkbox'
import { FaRegEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { useContext } from 'react'
import { myContext } from '../../App'
import { postData } from '../../../../frontend/src/utils/api'

const Signup = () => {
    const [loadingGoogle,setLoadingGoogle]=useState(false);
    const [loadingfb,setLoadingfb]=useState(false);
    const [isPasswordShow,setisPasswordShow]=useState(false);

    const [formfields,setFormfields]=useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        isAdmin:true
    })
    const context = useContext(myContext);

    function handleClickGoogle(){
        setLoadingGoogle(true);
    }
    function handleClickfb(){
        setLoadingfb(true);
    }

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

        // Make sure postData is awaited
        const res = await postData("/user/signup", formfields);

        if (res?.success) {  // Ensure response structure is correct
            context.setAlertBox({ open: true, error: false, msg: "Registered Successfully!" });

            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } else {
            context.setAlertBox({ open: true, error: true, msg: res?.msg || "Registration failed!" });
        }

    } catch (err) {
        console.error("Signup Error:", err);
        context.setAlertBox({ open: true, error: true, msg: "Something went wrong!" });
    }
};

  return (
    <>
      <section className=" bg-white w-full ">
        <header className='fixed top-0 left-0 w-full px-4 py-2 flex items-center justify-between z-50'>
        <Link to="/"><img className='w-[200px] px-5' src="https://logos-world.net/wp-content/uploads/2023/03/Fashion-Nova-Logo.png" alt="" /></Link>

        <div className="flex items-center gap-0">
            <Link to="/login" exact={true} activeClassName="isActive">
            <Button className="rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-2 bg-amber-700">
            <CgLogIn className='text-[18px]'/> Login
            </Button>
            </Link>
            
            <Link to="/signup" exact={true} activeClassName="isActive">
            <Button className="rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-2">
            <FaRegUser className='!text-[15px]'/> Sign Up
            </Button>
            </Link>
        </div>
 </header>
      
<div className="flex justify-center items-center min-h-screen">
  <div className="loginBox card w-[600px] h-auto pb-20 mx-auto pt-20 relative z-50">
  <img
    height="100px"
    width="100px"
    className="m-auto ab-img"
    src="https://static.vecteezy.com/system/resources/previews/009/481/029/non_2x/geometric-icon-logo-geometric-abstract-element-free-vector.jpg"
    alt=""
  />
    <h1 className="text-center text-[30px] font-[600] mt-0">
      Join us today! Get special<br/>
      benefits and stay up-to-date. 
    </h1>

    <div className="flex items-center mt-4 justify-center w-full gap-4">
      <LoadingButton
        size="small"
        onClick={handleClickGoogle}
        endIcon={<FcGoogle />}
        loading={loadingGoogle}
        loadingPosition="end"
        variant="outlined"
        className="!bg-none !py-2 !text-[15px] !capitalize !px-5 text-[rgba(0,0,0,0.7)]"
      >
        Sign in with Google
      </LoadingButton>

      <LoadingButton
        size="small"
        onClick={handleClickfb}
        endIcon={<BsFacebook />}
        loading={loadingfb}
        loadingPosition="end"
        variant="outlined"
        className="!bg-none !py-2 !text-[15px] !capitalize !px-5 text-[rgba(0,0,0,0.7)]"
      >
        Sign in with Facebook
      </LoadingButton>
    </div>
    <br />

    <div className="w-full flex items-center justify-center gap-3">
      <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
      <span className="text-[14px] font-[500]">Or, Sign in with your email</span>
      <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
    </div>
    <br />

    <form className="w-full px-8 mt-3" onSubmit={signUp}>
      <div className="form-group mb-4 w-full">
        <h4 className="text-[14px] font-[500] mb-1">Full Name</h4>
        <input type="text" name="name" onChange={onchangeInput} className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3" />
      </div>

      <div className="form-group mb-4 w-full">
        <h4 className="text-[14px] font-[500] mb-1">Email</h4>
        <input type="email" name="email" onChange={onchangeInput} className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3" />
      </div>

      <div className="form-group mb-4 w-full">
        <h4 className="text-[14px] font-[500] mb-1">Phone</h4>
        <input type="number" name="phone" onChange={onchangeInput} className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3" />
      </div>

      <div className="form-group mb-4 w-full">
        <h4 className="text-[14px] font-[500] mb-1">Password</h4>
        <div className="relative w-full">
          <input type={isPasswordShow ? 'text' : 'password'} name="password" onChange={onchangeInput} className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3" />
          <Button className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[40px] !text-[#000]" onClick={() => setisPasswordShow(!isPasswordShow)}>
            {isPasswordShow ? <FaEyeSlash className="text-[16px]" /> : <FaRegEye className="text-[16px]" />}
          </Button>
        </div>
      </div>

      <div className="form-group mb-4 w-full flex items-center justify-between">
        <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
        <Link to="/forgot-password" className="!text-success font-[700] text-[15px] hover:underline">Forgot Password?</Link>
      </div>

      <Button type='submit' className="btn-blue btn-lg w-full">Sign Up</Button>
    </form>
  </div>
</div>

      </section>
    </>
  )
}

export default Signup
