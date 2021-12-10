import React, { useState, useEffect } from "react";
import {connect} from "react-redux"
import {Paper,Stepper,Step,StepLabel,Typography} from "@material-ui/core";

import { store } from "../../app/store";
import { Navigate } from "react-router-dom";
import useStyles from "./styles";
import AddressForm from "../../components/AddressForm";
import PaymentForm from "../../components/PaymentForm"

const steps = ["Shipping Address", "Payment Details"];

const Checkout = ({ cartValue }) => {
  const [toRedirect, setToRedirect] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});

  const classes = useStyles();

  useEffect(()=>{
    let items= 0;
    cartValue.forEach(item => {
        items += item.qty;
    });
    if(items === 0) {setToRedirect(true)}
   },[cartValue])

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Confirmation = () => {
    setShippingData({"data": shippingData, "cart": [...cartValue]});
    store.dispatch({type:'ORDER_CONFIRMED'});
    console.log(shippingData);
    return <p>{JSON.stringify(shippingData)}</p>;
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        next={next}
        nextStep={nextStep}
        setShippingData={setShippingData}
      />
    ) : (
      <PaymentForm
        nextStep={nextStep}
        backStep={backStep}
        shippingData={shippingData}
        cartValue={cartValue}
      />
    );

  return (
    (toRedirect) ?
     <Navigate to="/confirmation" state={shippingData}/> :
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep >= steps.length ? (
            <Confirmation/>
          ) : (
             <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

const mapStateToProps=(state)=>{
    return {
        cartValue: state.cart.cart
    }
}
export default connect(mapStateToProps)(Checkout);