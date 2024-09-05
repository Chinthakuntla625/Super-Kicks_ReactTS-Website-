import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { clearCart } from './Cartslice';

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const kicksID=sessionStorage.getItem("KicksID");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddress=()=>{
    navigate('./AddressPack');
  };
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.clear();
      localStorage.clear();
      dispatch(clearCart());
      navigate('/Forms');
    }
  };
  const handleHistory=()=>{
        navigate('./OrderHistory');
    
  }

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
       <PersonPinIcon style={{fontSize:"35px",color:"black"}}/>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}><b style={{color:'red'}}>{kicksID}</b></MenuItem>
        <MenuItem onClick={handleAddress}>Address</MenuItem>
        <MenuItem onClick={handleHistory}>OrderHistory</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        

      </Menu>
    </div>
  );
}
