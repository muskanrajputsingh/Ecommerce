import { useState,useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Listing from "./components/Listing/Listing";
import ProductDetail from "./pages/productDetail/ProductDetail";
import Cart from "./pages/cart/Cart";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { createContext } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { postData } from "./utils/api";
import Search from "./components/search/Search";

const MyContext = createContext();

function App() {
  const [isLogin,setIsLogin]=useState(false);
  const [alertBox, setAlertBox] = useState({ msg: '', error: false, open: false });
  const [user, setUser] = useState({ name: "", email: "", userId: "" });
  const [cartFields,setCartFields]=useState({});
  const [addingInCart,setAddingInCart] = useState(false);
  const [searchData,setSearchData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token from localStorage:", token);

    if (token) {
        const userData = JSON.parse(localStorage.getItem("EcommerceUser"));
        setUser(userData);
        setIsLogin(true);  // ✅ Mark user as logged in
        console.log("User restored:", userData);
    } else {
        console.log("No token found. User not logged in.");
    }
}, []);

// const addToCart = async (data) => {
//   console.log("Received data:", data);

//   // Validate the received data before making API call
//   if (!data || !data.image || !data.productId) {
//     console.error("Invalid data or image property missing:", data);
//     return;
//   }

//   const storedUser = JSON.parse(localStorage.getItem("EcommerceUser"));
//   if (!storedUser || !storedUser.userId) {
//     console.error("User not found in localStorage. Please log in.");
//     return;
//   }

//   const quantity = data?.quantity ?? 1; // Default to 1 if undefined
//   const price = data?.price ?? 0;

//   const cartItem = {
//     productTitle: data?.productTitle || "Unknown Product",
//     image: data?.image || "default-image.jpg",
//     rating: data?.rating || 0,
//     price: price,
//     quantity: quantity,
//     subTotal: price * quantity, // Ensure valid calculation
//     productId: data?.productId || "Unknown",
//     userId: storedUser?.userId,
//   };

//   try {
//     const res = await postData(`/cart/add`, cartItem);

//     if (res) {
//       setAlertBox({
//         open: true,
//         error: false,
//         msg: "Item added to the cart",
//       });

//       // Update cart state **only if API call succeeds**
//       setCartData((prevCartData) => [...prevCartData, cartItem]);
//     } else {
//       setAlertBox({
//         open: true,
//         error: true,
//         msg: "Failed to add item to cart",
//       });
//     }
//   } catch (error) {
//     console.error("Error adding item to cart:", error);
//     setAlertBox({
//       open: true,
//       error: true,
//       msg: "Something went wrong",
//     });
//   }

//   console.log("Updated Cart Item:", cartItem);
// };

const addToCart = (data) => {
  setAddingInCart(true);

  console.log("Received data:", data);

  if (!data || !data.productTitle || !data.image || !data.productId) {
    console.error("Invalid data: Missing required fields", data);
    return;
  }

  const storedUser = JSON.parse(localStorage.getItem("EcommerceUser"));

  if (!storedUser || !storedUser.userId) {
    console.error("User not found in localStorage. Please log in.");
    return;
  }

  const quantity = data?.quantity ?? 1;  
  const price = data?.price ?? 0;

  const cartItem = {
    productTitle: data?.productTitle || "Unknown Product",
    image: data?.image || "default-image.jpg",
    rating: data?.rating || 0,
    price: price,
    quantity: quantity,
    subTotal: price * quantity,
    productId: data?.productId || "Unknown",
    userId: storedUser?.userId,
  };

  console.log("Updated Cart Item before sending request:", cartItem);

  postData(`/cart/add`, cartItem)
  .then((res) => {
    console.log("Response received:", res);
    
    if (res.status) {
      setAlertBox({ open: true, error: false, msg: "Item added to cart" })
      setTimeout(()=>{
        setAddingInCart(false);
      },1000);
     
    } else {
      setAlertBox({ open: true, error: true, msg: res.msg || "Item already added in cart" });
      setAddingInCart(false);
    }
  })
  .catch((err) => {
    console.error("Error adding item to cart:", err);
    setAlertBox({ open: true, error: true, msg: "Item already added in cart." });
  });

};


  const values={
    isLogin,
    setIsLogin,
    alertBox,
    setAlertBox,
    user,
    setUser,
    addToCart,
    addingInCart,
    setAddingInCart,
    searchData,
    setSearchData
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlertBox({ open: false, msg: '' });
  };

  return (
    <BrowserRouter>
    <MyContext.Provider value={values}>
    <Layout />
    <Snackbar open={alertBox.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertBox.error === false ? "success" : "error"} variant="filled" sx={{ width: '100%' }}>
          {alertBox.msg}
        </Alert>
      </Snackbar>
    </MyContext.Provider>
    </BrowserRouter>
  );
}

// Layout component to conditionally show Navbar and Footer

const Layout = () => {
  const location = useLocation();

  // Hide Navbar and Footer on these pages
  const hideHeaderFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/subCat/:id" exact element={<Listing />} />
        <Route path="/product/:id" exact element={<ProductDetail />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/search" exact element={<Search/>} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default App;
export {MyContext};