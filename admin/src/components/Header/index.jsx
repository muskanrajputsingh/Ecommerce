import React, { useContext } from 'react';
import  Button  from '@mui/material/Button';
import {RiMenu2Line} from "react-icons/ri" ; 
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import {FaRegBell, FaRegUser} from "react-icons/fa" ;
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import {IoMdLogOut} from "react-icons/io";
import { myContext } from '../../App';
import { Link } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header = () => {
    const [anchorMyAcc, setAnchorMyAcc] = React.useState(null);
    const openMyAcc = Boolean(anchorMyAcc);
    const handleClickMyAcc = (event) => {
      setAnchorMyAcc(event.currentTarget);
    };
    const handleCloseMyAcc = () => {
      setAnchorMyAcc(null);
    };
 
    const logout=()=>{
      localStorage.clear();
      window.location.href="/login"
    }

    const context = useContext(myContext);

  return (
   <header className="w-full h-[auto] py-2 pl-64 shadow-md pr-7 bg-[#fafafa] flex items-center justify-between">
    <div className="part1">
     <Button className='!w-[40px] !h-[40px] !rounded-full !min-w-[40px] text-[rgba(0,0,0,0.8)]'>
        <RiMenu2Line className='text-[18px] text-[rgba(0,0,0,0.8)]'/>
    </Button>
    </div>

  <div className="part2 w-[40%] flex items-center justify-end gap-3">
  <IconButton aria-label="cart">
      <StyledBadge badgeContent={4} color="secondary">
        <FaRegBell />
      </StyledBadge>
    </IconButton>

    {
      context.isLogin === true ? <div className="relative">
      <div className="rounded-full w-[35px] h-[35px] border-2 overflow-hidden bg-amber-500 cursor-pointer" onClick={handleClickMyAcc}>
     <p className='text-center'>{context.user?.name.charAt(0)}</p> 
     </div>
     
     <Menu
             anchorEl={anchorMyAcc}
             id="account-menu"
             open={openMyAcc}
             onClose={handleCloseMyAcc}
             onClick={handleCloseMyAcc}
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
             <MenuItem onClick={handleCloseMyAcc} className='!bg-white'>
              <div className="flex items-center gap-3">
     
              <div className="rounded-full w-[35px] h-[35px] border-2 overflow-hidden bg-amber-500 cursor-pointer">
              <p className='text-center'>{context.user?.name.charAt(0)}</p> 
              </div>
             
              <div className="info">
                 <h3 className='text-[15px] font-[500] leading-5'>{context.user?.name}</h3>
                 <p className='text-[12px] font-[400] opacity-70'>{context.user?.email}</p>
              </div>
     
              </div>
             </MenuItem>
             <Divider />
             <MenuItem onClick={handleCloseMyAcc} className='flex items-center gap-3'>
             <FaRegUser className='text-[16px]' /> <span className='text-[14px]'>Profile</span>
             </MenuItem>
             <MenuItem onClick={logout} className='flex items-center gap-3'>
             <IoMdLogOut className='text-[18px]'/> <span className='text-[14px]'>Sign Out</span>
             </MenuItem>
           </Menu>
      </div>
      : 
      <Button className='btn-blue !btn-sm !rounded-full'> <Link to="/login">Sign In</Link></Button>
    }
  
</div>
   </header>
  )
}

export default Header
