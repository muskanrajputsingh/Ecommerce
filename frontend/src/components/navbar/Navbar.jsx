import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { FaShoppingCart, FaUserAlt, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { IoBagCheckSharp } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom";

  const Navbar = () => {

    const [categories, setCategories] = useState([]);      
    const [subCategories, setSubCategories] = useState([]); 
    const [anchorEl, setAnchorEl] = useState(null);
    const context = useContext(MyContext);
    const { cartData, setCartData } = useContext(MyContext);
    const navigate = useNavigate();
    const [searchFields,setSearchFields]=useState("");

    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
    

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchCategories = async () => {
    try {
        const res = await fetchDataFromApi("/category?all=true");
        console.log("Categories API Response:", res); // 🔍 Debugging

        if (res && Array.isArray(res.categoryList)) { 
            setCategories(res.categoryList);  // ✅ Only set if it's an array
        } else {
            console.error("Invalid category response:", res);
            setCategories([]); // ✅ Ensure it's always an array
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // ✅ Always an array
    }
};

const fetchSubCategories = async () => {
    try {
        const res = await fetchDataFromApi("/subcategory?all=true");
        console.log("Subcategories API Response:", res); // 🔍 Debugging

        if (res && Array.isArray(res.subCategoryList)) {
            setSubCategories(res.subCategoryList);
        } else {
            console.error("Invalid subcategory response:", res);
            setSubCategories([]);
        }
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        setSubCategories([]);
    }
};

const logout=()=>{
  localStorage.clear();
  window.location.href="/login"
}

const onChangeValue=(e)=>{
  setSearchFields(e.target.value);
}

const searchProducts = () => {
  const categoryMatch = categories.find(cat =>
    cat.name.toLowerCase() === searchFields.toLowerCase()
  );

  const subCatMatch = subCategories.find(sub =>
    sub.subCat.toLowerCase() === searchFields.toLowerCase()
  );

  if (subCatMatch) {
    navigate(`/subCat/${subCatMatch._id}`);
    return;
  }

  if (categoryMatch) {
  } else {
    fetchDataFromApi(`/search?q=${searchFields}`).then((res) => {
      context.setSearchData(res);
      navigate("/search");
    });
  }
};


  return (
    <div className="nav">
      {/* Nav Part 1 */}
      <div className="nav-box1">
        <div className="nav-logo">
          <Link to={'/'}>
            <img
              src="https://logos-world.net/wp-content/uploads/2023/03/Fashion-Nova-Logo.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="slogan">
          <h5>Fashion that embraces all shapes and sizes!</h5>
        </div>
      </div>

      {/* Nav Part 2 */}
      <div className="nav-box2">
        <div className="nav-left">
        <ul>
  {Array.isArray(categories) && categories.length > 0 ? (
    categories.map((category) => (
      <li key={category.id} className="dropdown">
        <Link to="#" className="dropbtn">{category.name}</Link>
        <div className="dropdown-content shadow">
          {Array.isArray(subCategories) ? (
            subCategories
              .filter(sub => sub.category && sub.category._id === category.id)
              .map((sub) => (
                <Link key={sub.id} to={`/subCat/${sub?._id}`}>{sub.subCat}</Link>
              ))
          ) : null}
        </div>
      </li>
    ))
  ) : (
    <p>No categories found.</p>
  )}
</ul>
 </div>

 {/* //searching */}
        <div className="search-container">
          <input type="text" placeholder=" Search for Products..."  onChange={onChangeValue}/>
          <FaSearch className="search-icon" onClick={searchProducts} />
        </div>

        <div className="nav-right">
          <div className="cart-icon-wrapper slogan">
            {context.isLogin !== true ? (
              <button className="btnn">
                <Link to="/login">Sign In</Link>
              </button>
            ) :  (
              <>
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
       <FaUserAlt />
     </div>

       <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="5px" />
          </ListItemIcon>
          Logout
        </MenuItem>
       </Menu>
       </>
    )}
            <Link to="/cart" className="icon">
              <FaShoppingCart />
            </Link>
            <div className="cart-notification">{cartData.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

