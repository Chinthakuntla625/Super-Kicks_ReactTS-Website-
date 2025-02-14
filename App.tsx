import './css/App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { BrowserRouter as Router, Routes, Route, Link, useLocation,useNavigate } from 'react-router-dom';
import Products from './Products';
import Forms from './Forms';
import Signup from './Signup';
import Nike from './Nike';
import Adidas from './Adidas';
import Sketchers from './Sketchers';
import NewBalance from './NewBalance';
import OrderHistory from './OrderHistory';
import ProductDescription from './ProductDescription';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { clearCart } from './Cartslice';
import FadeMenu from './FadeMenu';
import AddressPack from './AddressPack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartPage from './CartPage';
import Address from './Address';
import Payment from './Payment';
import Placeorder from './Placeorder';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <AppContent />
        <ToastContainer/>
      </Router>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [search, setSearch] = React.useState<string>("");
  const location = useLocation();
  const HeaderPaths = [
    '/Products', '/'
  ];  
  const showHeaderPaths = HeaderPaths.some(path => location.pathname.startsWith(path));

  return (
    <div>
      <Header search={search} setSearch={setSearch} />
    
      {showHeaderPaths && <Head />}
 
      <Routes>
        <Route path='/' element={<Products searchQuery={search} />} />
        <Route path='/Products' element={<Products searchQuery={search} />} />
        <Route path='/Forms' element={<Forms />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Nike' element={<Nike searchQuery={search} />} />
        <Route path='/Adidas' element={<Adidas searchQuery={search}/>} />
        <Route path='/Sketchers' element={<Sketchers searchQuery={search}/>} />
        <Route path='/NewBalance' element={<NewBalance searchQuery={search} />} />
        <Route path='/ProductDescription/:id' element={<ProductDescription />} />
        <Route path='/OrderHistory' element={<OrderHistory />} />
        <Route path='/AddressPack' element={<AddressPack />} />
        <Route path='/CartPage' element={<CartPage/>} />
        <Route path='/Payment' element={<Payment/>} />
        <Route path='/Address' element={<Address/>} />
        <Route path='/Placeorder' element={<Placeorder/>} />

      </Routes>
    </div>
  );
};

interface HeaderProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
interface RootState {
  cart: {
    count: number;
  };
}

const Header: React.FC<HeaderProps> = ({ search, setSearch }) => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const count = useSelector((state: RootState) => state.cart.count);
  const kicksID=sessionStorage.getItem("KicksID")
  
  const handleLogout = () => {
  if (window.confirm("Are you sure you want to logout?")) {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(clearCart());
    navigate('/Forms');
  }
};

const handleLogin = () => {
  navigate('/Forms');
};

  
  return (
    <div className='Header'>
      <div className='Header-content'>
        <div className='Header-left'>
          <h3 style={{ color: 'rgb(241, 44, 44)' ,marginTop:"5px"}}>
            <Link to='./Products' style={{textDecoration:"none",color:"orange"}} ><b>Find your kicks.</b></Link>
          </h3>
          <input
            type="text"
            placeholder='Search Sneaker'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        
        
        </div>
        <div className='Header-center'>
          <img
            className="img1"
            src='https://www.superkicks.in/cdn/shop/files/BLACK_SK_LOGO.png?v=1724394137&width=500'
            alt='Super Kicks'
          />
        </div>
        <div className='Header-right'>
          <Box className='box'>
          <Link to='./CartPage'><ShoppingCartIcon style={{ fontSize: '24px', cursor: "pointer",color:"black" }} /><sub style={{color:"black"}}>{count}</sub></Link>
        
          <FadeMenu/>
  
          {kicksID === null ? (
        <Button variant='text'
        style={{color: 'black',backgroundColor: "transparent",fontWeight: "bold",
          marginTop: "5px",
        }} onClick={handleLogin}>Sign In</Button>
      ) : (
        <Button variant='text'
        style={{color: 'black',backgroundColor: "transparent",fontWeight: "bold",
          marginTop: "5px",
        }}onClick={handleLogout}  >LogOut</Button>
      )}
            
          </Box>
        </div>
      </div>
    </div>
  );
};




interface ItemProps {
  children: React.ReactNode;
}

const Item: React.FC<ItemProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

const Head: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '38px',
      marginTop: "6px",
      marginBottom: "12px",
      paddingBottom:"8px",
      backgroundColor:"black",
      color:"white",
      boxShadow: "0 4px 2px rgba(0, 0, 0, 0.1)",
      borderRadius:"4px"
    }}>
      <Stack
        direction={{ xs: 'row', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        alignItems="center"
        justifyContent="center"
        
      >
        <Item><Link to='/Nike' className='link'><b>Nike</b></Link></Item>
        <Item><Link to='/Adidas' className='link'><b>Adidas</b></Link></Item>
        <Item><Link to='/Sketchers' className='link'><b>Yeezys</b></Link></Item>
        <Item><Link to='/NewBalance' className='link'><b>New Balance</b></Link></Item>
      </Stack>
    </div>
  );
}

export default App;


