import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Products.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Grid, Divider,Container, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Footer from './Footer';

interface Product {
  id: string;
  image: string;
  brand: string;
  model: string;
  price: number;
  oldPrice?: number;
}

interface ProductsProps {
  searchQuery: string;
}

const MyCarouselComponent: React.FC = () => {
  return (
    <Carousel className='carousel'>
      <Carousel.Item>
        <img
          src='https://cdn.findyourkicks.com/uploads/all/4571d3a3319822c8292340cb1fc8c21d.png'
          alt='iPhone 15 Special Deals'
          className='carousel-image'
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src='https://cdn.findyourkicks.com/uploads/all/e757cd4e577e253a57c16a742911933a.png'
          alt='Artstation Banner'
          className='carousel-image'
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src='https://cdn.findyourkicks.com/uploads/all/52211b29da6de9e3c8193035654844c2.jpg'
          alt='iPhone 15 Pre-Orders'
          className='carousel-image'
        />
      </Carousel.Item>
    </Carousel>
  );
};


const ProductCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(1),
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  borderRadius: '20px',
}));

const Products: React.FC<ProductsProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("http://localhost:8000/products");
        setProducts(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/ProductDescription/${productId}`);
  };

  const filteredProducts = products.filter(product =>
    product.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{marginBottom:"35px"}}>
       <MyCarouselComponent />
    {/* <Container style={{marginBottom:"25px"}}>
      </Container> */}
 
      <Typography variant="h4"  align="center"  sx={{ mt: 4, mb: 4, fontWeight: 'bold' ,color:"purple"}}>
        Shop by Brand
      </Typography>
      
      <Divider></Divider>
      <div style={{display:"flex",flexDirection:"row"}}>
        <Link to='/Nike'><img src='https://www.findyourkicks.com/assets/imagess/shop-by-brand-3.jpg' alt='nike'
         style={{width:"300px",height:"180px",borderRadius:"20px",paddingLeft:"6px"}}></img></Link>
        <Link to='/Adidas'><img src='https://www.findyourkicks.com/assets/imagess/shop-by-brand-1.jpg' alt='adidas' 
        style={{width:"300px",height:"180px",borderRadius:"20px",paddingLeft:"6px"}}></img></Link>
        <Link to='/Sketchers'><img src='https://www.findyourkicks.com/assets/imagess/shop-by-brand-2.jpg' alt='Yeezy'
         style={{width:"300px",height:"180px",borderRadius:"20px",paddingLeft:"6px"}}></img></Link>
        <Link to='/NewBalance'><img src='https://www.findyourkicks.com/assets/imagess/new-balance.jpeg' alt='Newbalance'
         style={{width:"300px",height:"180px",borderRadius:"20px",paddingLeft:"6px"}}></img></Link>
      </div>
   
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4, mb: 4, fontWeight: 'bold' ,color:"purple"}}>
        PRODUCTS
      </Typography>
      <Divider></Divider>

      <Grid container spacing={4} justifyContent="center">
        {filteredProducts.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No products available
          </Typography>
        ) : (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.model}
                />
                <CardContent>
                  <Typography variant="h6" component="div" fontWeight="bold">
                    {product.brand}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    {product.model}
                  </Typography>
                  <Typography variant="body2" color="primary" fontWeight="bold">
                    ${product.price}
                  </Typography>
                  {product.oldPrice && (
                    <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
                      ${product.oldPrice}
                    </Typography>
                  )}
                  <StyledButton variant="contained" color="secondary" onClick={() => handleProductClick(product.id)}>
                    View Details
                  </StyledButton>
                </CardContent>
              </ProductCard>
            </Grid>
          ))
        )}
      </Grid>
      
   <div style={{marginTop:"50px"}}>
   <Footer />
   </div>
    
    </div>
  );
};

export default Products;




// import React, { useState, useEffect } from 'react';
// import Carousel from 'react-bootstrap/Carousel';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/Products.css';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { Card, CardMedia, CardContent, Typography, Grid, Container, Button } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { keyframes } from '@emotion/react';


// interface Product {
//   id: string;
//   image: string;
//   brand: string;
//   model: string;
//   price: number;
//   oldPrice?: number;
// }

// interface ProductsProps {
//   searchQuery: string;
// }

// const CrazyCard = styled(Card)(({ theme }) => ({
//   maxWidth: 345,
//   margin: theme.spacing(2),
//   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//   border: '2px solid #f44336',
//   borderRadius: '20px',
//   overflow: 'hidden',
//   position: 'relative',
//   '&:hover': {
   
//     boxShadow: theme.shadows[10],
   
//   },
// }));

// const CrazyButton = styled(Button)(({ theme }) => ({
//   marginTop: theme.spacing(1),
//   borderRadius: '20px',
//   backgroundColor: '#ff5722',
//   color: '#fff',
//   '&:hover': {
//     backgroundColor: '#e64a19',
//   },
// }));

// const CrazyTypography = styled(Typography)(({ theme }) => ({
//   color: '#4caf50',
//   fontWeight: 'bold',
//   textTransform: 'uppercase',
//   letterSpacing: '1px',
// }));

// const CrazyContainer = styled(Container)(({ theme }) => ({
//   backgroundColor: '#e1bee7',
//   padding: theme.spacing(4),
//   borderRadius: '15px',
//   boxShadow: theme.shadows[5],
// }));

// const MyCarouselComponent: React.FC = () => {
//   return (
//     <Carousel className='carousel'>
//       <Carousel.Item>
//         <img
//           src='https://cdn.findyourkicks.com/uploads/all/4571d3a3319822c8292340cb1fc8c21d.png'
//           alt='iPhone 15 Special Deals'
//           className='carousel-image'
//         />
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           src='https://cdn.findyourkicks.com/uploads/all/0943ed0d853abb73b9a3ffdbf71e3fd2.webp'
//           alt='Artstation Banner'
//           className='carousel-image'
//         />
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           src='https://cdn.findyourkicks.com/uploads/all/52211b29da6de9e3c8193035654844c2.jpg'
//           alt='iPhone 15 Pre-Orders'
//           className='carousel-image'
//         />
//       </Carousel.Item>
//     </Carousel>
//   );
// };

// const Products: React.FC<ProductsProps> = ({ searchQuery }) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get<Product[]>("http://localhost:5000/products");
//         setProducts(response.data);
//       } catch (error) {
//         console.log("Error:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleProductClick = (productId: string) => {
//     navigate(`/ProductDescription/${productId}`);
//   };

//   const filteredProducts = products.filter(product =>
//     product.model.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <CrazyContainer>
//       <MyCarouselComponent />

//       <CrazyTypography variant="h4" gutterBottom align="center">
//         PRODUCTS
//       </CrazyTypography>

//       <Grid container spacing={4} justifyContent="center">
//         {filteredProducts.length === 0 ? (
//           <Typography variant="h6" align="center" sx={{ mt: 4 }}>
//             No products available
//           </Typography>
//         ) : (
//           filteredProducts.map((product) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
//               <CrazyCard>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={product.image}
//                   alt={product.model}
//                 />
//                 <CardContent>
//                   <Typography variant="h6" component="div" color="#e91e63">
//                     {product.brand}
//                   </Typography>
//                   <Typography variant="body1" color="text.secondary" gutterBottom>
//                     {product.model}
//                   </Typography>
//                   <Typography variant="body2" color="primary" fontWeight="bold">
//                     ${product.price}
//                   </Typography>
//                   {product.oldPrice && (
//                     <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
//                       ${product.oldPrice}
//                     </Typography>
//                   )}
//                   <CrazyButton variant="contained" onClick={() => handleProductClick(product.id)}>
//                     View Details
//                   </CrazyButton>
//                 </CardContent>
//               </CrazyCard>
//             </Grid>
//           ))
//         )}
//       </Grid>
//     </CrazyContainer>
//   );
// };

// export default Products;
