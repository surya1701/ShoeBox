import React from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";

import { Link } from "react-router-dom";
import FormInput from "./FormField";

const AddressForm = ({ next, user }) => {

    const methods = useForm();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({...data})
          )}
        >
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First Name"  size={6} type="text"/>
            <FormInput required name="lastName" label="Last Name"  size={6} type="text"/>
            <FormInput required name="address" label="Address Line" size={12} type="text"/>
            <FormInput required name="email" label="Email"  size={6} type="email" fill={user.email}/>
            <FormInput required name="state" label="State"  size={6} type="text"/>
            <FormInput required name="country" label="Country"  size={6} type="text"/>
            <FormInput required name="zip" label="Zip / Postal code"  size={6} type="number"/>
          </Grid>
          <br />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;