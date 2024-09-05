import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from './Cartslice';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Footer from './Footer';
import { ToastContainer,toast } from 'react-toastify';

interface Product {
    id: string;
    image: string;
    model: string;
    brand: string;
    price: number;
    oldPrice?: number;
    description: string;
}

interface CartItem {
    id: string;
    image: string;
    model: string;
    price: number;
    quantity: number; 
}

const NikeCard = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 800,
    height: 300,
    margin: theme.spacing(2),
    
    borderRadius: 17,
}));

const ProductContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    padding: theme.spacing(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    border:'none',
    boxShadow: theme.shadows[1],
    borderRadius: 17,
    marginTop: 10,
    marginBottom:20,
}));

const ImageContainer = styled('div')(({ theme }) => ({
    marginRight: theme.spacing(2.5),
}));

const ImageStyle = {
    borderRadius: '8px',
    padding: '10px',
    margin: '16px',
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: 1000,
    height: 300,
    objectFit: 'cover',
};

const CustomButton = styled(Button)(({ theme }) => ({
    margin: '0px',
    padding: '8px 12px',
    backgroundColor: 'purple',
    color: 'white',
    borderRadius: '4px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        backgroundColor: '#60a7be',
        transform: 'scale(1.03)',
    },
}));

const ProductDescription: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [cartbtn, setCartbtn] = useState<string>("Add to cart");
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState<boolean>(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/products/${id}`);
                if (!response.ok) {
                    throw new Error("Network response is not good");
                }
                const data: Product = await response.json();
                setProduct(data);
            } catch (error) {
                console.log("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    const handleAddToCart = () => {
        if (product) {
          
            const cartItem: CartItem = {
                id: product.id,
                image: product.image,
                model: product.model,
                price: product.price,
                quantity: 1, 
            };
            dispatch(addToCart(cartItem));
            setCartbtn("Added");
            toast.success("Item added to Cart")
            setTimeout(() => {
                setCartbtn("Add more (+)");
            }, 1500);
            setShowToast(true);
        }
    };

    return (
        <div>
            <ProductContainer>
                <ImageContainer>
                    <CardMedia
                        component="img"
                        alt={product.model}
                        image={product.image}
                        sx={ImageStyle}
                    />
                </ImageContainer>
                <NikeCard>
                    <CardContent>
                        <Typography variant="h5" gutterBottom color='text.primary'>
                           <b>{product.model}</b> 
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ color: "red" }}>
                            {product.brand}
                        </Typography>
                        <Typography variant="body1" color="text.primary" sx={{ mt: 2 }}>
                            <strong>Price:</strong> {product.price}$
                            {product.oldPrice && (
                                <del style={{ fontWeight: "lighter", paddingLeft: "15px", fontSize: "small" }}>
                                    {product.oldPrice}$
                                </del>
                            )}
                        </Typography>
                        <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
                            <strong>Description:</strong> {product.description}
                        </Typography>
                        <CustomButton
                            variant="contained"
                            color="primary"
                            onClick={handleAddToCart}
                            sx={{ mt: 2 }}
                        >
                            {cartbtn}
                        </CustomButton>
                    </CardContent>
                </NikeCard>
            </ProductContainer>
            <Footer/>
            <ToastContainer/>
        </div>
    );
};

export default ProductDescription;
