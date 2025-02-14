import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Container, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProductCard = styled(Card)(({ theme }) => ({
  maxWidth: 1000,
  margin: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  width: '160px',
  marginLeft: theme.spacing(1),
  marginTop:"20px"
}));

interface Address {
  KicksID: string;
  FirstName: string;
  Mobile: string;
  Address: string;
  State: string;
}

const Addresspack: React.FC = () => {
  const [address, setAddress] = useState<Address[]>([]);
  const kicksID = sessionStorage.getItem('KicksID');
  const navigate = useNavigate();

  const handleAddress = () => {
    navigate('/Address');
  }

  const handleThisAddress = () => {
    navigate('/Payment');
  }

  const filteredProducts = address.filter((i) => i.KicksID === kicksID);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get<Address[]>('http://localhost:8000/address');
        setAddress(response.data);
      } catch (error) {
        console.error('Error fetching addresses', error);

      }
    };

    fetchAddresses();
  }, [kicksID]);

  return (
    <div className='order-history'>
      <Container>
        {kicksID === null ? (
          <Typography variant="h6" align="center" style={{ marginTop: '25px' }}>
            <b>PLEASE LOGIN TO VIEW YOUR SAVED ADDRESSES</b>
          </Typography>
        ) : (
          <>
            <Typography variant='h4'  >
              <b>SAVED ADDRESSES</b>
            </Typography>
            <StyledButton
              style={{ width: '190px' ,marginTop: '15px' }}
              onClick={handleAddress}
              variant='contained'
              color='secondary'
            >
              <b style={{ paddingRight: '20px' }}>
                Add Address (+)
              </b>
            </StyledButton>
          </>
        )}
        <Grid container spacing={2}>
          {filteredProducts.length === 0 ? (
            <Typography variant="h6" align="center" style={{ marginTop: '175px',marginLeft: '475px' }}>
              <b>No Address found.</b>
            </Typography>
          ) : (
            filteredProducts.map((x, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ProductCard>
                  <CardContent>
                    <Typography variant='h6' >
                      <b>Address-{index + 1}</b>
                    </Typography>
                    <hr></hr>
                    <Typography variant="body2"><b>KICKS ID:</b> {x.KicksID}</Typography>
                    <Typography variant="body2"><b>Name:</b> {x.FirstName}</Typography>
                    <Typography variant="body2"><b>Mobile Number:</b> {x.Mobile}</Typography>
                    <Typography variant="body2"><b>Address:</b> {x.Address}</Typography>
                    <Typography variant="body2"><b>State:</b> {x.State}</Typography>
                    <StyledButton
                      variant='outlined'
                      color='secondary'
                      onClick={handleThisAddress}
                    >
                      <b style={{ paddingRight: '7px' }}>
                        Continue with this Address
                      </b>
                    </StyledButton>
                  </CardContent>
                </ProductCard>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Addresspack;
