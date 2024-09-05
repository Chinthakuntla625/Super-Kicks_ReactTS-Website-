import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {TextField,Button,Container,Typography,Grid} from '@mui/material';

interface FormValues {
  FirstName: string;
  Mobile: string;
  KicksID: string;
  Address: string;
  State: string;
}

const initialValues: FormValues = {
  FirstName: "",
  Mobile: "",
  KicksID: "",
  Address: "",
  State: "",
};

const validationSchema = Yup.object({
  FirstName: Yup.string().required("Name is required"),
  Mobile: Yup.string().required("Mobile Number is required").matches(/^\d+$/, "Mobile must be a number"),
  KicksID: Yup.string().required("Enter Kicks ID"),
  Address: Yup.string().required("Address is required"),
  State: Yup.string().required("Enter state"),
});

const Address: React.FC = () => {
  const navigate = useNavigate();
  const [save, setSave] = useState<boolean>(false);
  const kicksID = sessionStorage.getItem("KicksID") || '';

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (save) {
        event.returnValue = "Changes may not be saved on reload";
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [save]);

  const handleSignup = async (values: FormValues) => {
    try {
      await axios.post("http://localhost:8000/address", values);
      const response = await axios.get("http://localhost:8000/address");
      const userdata = response.data.find((i: any) => i.KicksID === kicksID);

      if (userdata) {
        toast.success("Address added successfully");
        setTimeout(()=>{
          navigate('/Payment');
        },3000);
       
      } else {
        toast.error("Kicks ID is not matching");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Shipping Details
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignup}
        validate={() => setSave(true)}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field name="FirstName">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.FirstName && touched.FirstName)}
                      helperText={<ErrorMessage name="FirstName" />}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field name="Mobile">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="Mobile Number"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.Mobile && touched.Mobile)}
                      helperText={<ErrorMessage name="Mobile" />}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field name="KicksID">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="Kicks ID"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.KicksID && touched.KicksID)}
                      helperText={<ErrorMessage name="KicksID" />}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field name="Address">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="Address with Pincode"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.Address && touched.Address)}
                      helperText={<ErrorMessage name="Address" />}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field name="State">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="Town & State"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.State && touched.State)}
                      helperText={<ErrorMessage name="State" />}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '16px' }}
                >
                  Proceed to Payment
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Address;
