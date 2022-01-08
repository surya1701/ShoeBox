import React from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "../checkout/Forms/FormField";

const Coupon = ({ handleCoupon, user }) => {

    const methods = useForm();

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            handleCoupon({...data})
          )}
        >
          <Grid container spacing={3}>
            <FormInput required name="coupon" label="Coupon Code"  size={6} type="text"/>
            <Button type="submit" variant="contained" color="primary">
              Enter
            </Button>
          </Grid>
          <br />
        </form>
      </FormProvider>
    </>
  );
};

export default Coupon;