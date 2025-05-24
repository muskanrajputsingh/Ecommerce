import React, { useState, useEffect, createContext } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import HomeSlider from './pages/HomeSlider';
import AddHomeSlider from './pages/HomeSlider/AddHomeSlider';
import Category from './pages/Category';
import AddCategory from './pages/Category/AddCategory';
import AddSubCategory from './pages/Category/AddSubCategory';
import SubCategoryList from './pages/Category/SubCategoryList';
import Users from './pages/Users';
import Orders from './pages/Orders';
import Forgot from './pages/Forgot';
import Verify from './pages/Verify';
import ChangePassword from './pages/ChangePassword';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingBar from 'react-top-loading-bar';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoMdClose } from 'react-icons/io';
import AddProduct from './pages/AddProduct.jsx';

const myContext = createContext();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const [progress, setProgress] = useState(0);
  const [isLogin, setisLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alertBox, setAlertBox] = useState({ msg: '', error: false, open: false });
  const [user, setUser] = useState({ name: "", email: "", userId: "" });
  const [isOpenFullScreenPanel, setisOpenFullScreenPanel] = useState({
    open: false,
    model: '',
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token from localStorage:", token);
    if (token) {
      setisLogin(true);
      const userData = JSON.parse(localStorage.getItem("EcommerceUser"));
      setUser(userData);
    } else {
      setisLogin(false);
    }
    setLoading(false);  // Stop loading after checking login
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlertBox({ open: false, msg: '' });
  };

  if (loading) return <div>Loading...</div>;

  const router = createBrowserRouter([
    { path: "/", element: isLogin ? <Navigate to="/dashboard" /> : <Navigate to="/login" /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/dashboard", element: getProtectedElement(<Dashboard />) },
    { path: "/products", element: getProtectedElement(<Products />) },
    { path: "/homeslider/list", element: getProtectedElement(<HomeSlider />) },
    { path: "/homeslider/add", element: getProtectedElement(<AddHomeSlider />) },
    { path: "/category/list", element: getProtectedElement(<Category />) },
    { path: "/category/add", element: getProtectedElement(<AddCategory />) },
    { path: "/subcategory/add", element: getProtectedElement(<AddSubCategory />) },
    { path: "/subcategory/list", element: getProtectedElement(<SubCategoryList />) },
    { path: "/users", element: getProtectedElement(<Users />) },
    { path: "/orders", element: getProtectedElement(<Orders />) },
    { path: "/forgotpassword", element: <Forgot /> },
    { path: "/verify", element: <Verify /> },
    { path: "/changepassword", element: <ChangePassword /> },
    { path: "*", element: <Navigate to={isLogin ? "/dashboard" : "/login"} /> }
  ]);

  function getProtectedElement(component) {
    return isLogin ? (
      <section className="main">
        <Header />
        <div className="contentMain flex">
          <div className="sidebarWrapper w-[17%]"><Sidebar /></div>
          <div className="contentRight py-4 px-5 w-[82%]">{component}</div>
        </div>
      </section>
    ) : (
      <Navigate to="/login" />
    );
  }

  const values = {
    isLogin,
    setisLogin,
    isOpenFullScreenPanel,
    setisOpenFullScreenPanel,
    alertBox,
    setAlertBox,
    setProgress,
    user,
    setUser,
  };

  return (
    <myContext.Provider value={values}>
      <RouterProvider router={router} />
      <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} className="topLoadingBar" />

      <Snackbar open={alertBox.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertBox.error === false ? "success" : "error"} variant="filled" sx={{ width: '100%' }}>
          {alertBox.msg}
        </Alert>
      </Snackbar>

      <Dialog
        fullScreen
        open={isOpenFullScreenPanel.open}
        onClose={() => setisOpenFullScreenPanel({ open: false, model: '' })}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" style={{color:'red'}} color="inherit" onClick={() => setisOpenFullScreenPanel({ open: false, model: '' })} aria-label="close">
              <IoMdClose />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" style={{color:'blue'}}>
              {isOpenFullScreenPanel.model}
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Inside Dialog you can render your AddProduct/AddCategory etc dynamically */}
        {
         isOpenFullScreenPanel?.model === "Add Product" && <AddProduct />
        }
         {
        isOpenFullScreenPanel?.model === "Add Home Slide" && <AddHomeSlider />
        }
         {
         isOpenFullScreenPanel?.model === "Add New Category" && <AddCategory />
        }
        {
        isOpenFullScreenPanel?.model === "Add Sub Category" && <AddSubCategory />
      }
      </Dialog>

    </myContext.Provider>
  );
}

export default App;
export { myContext };



