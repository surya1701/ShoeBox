import React, {useEffect, useState} from "react";
import useRazorpay from "react-razorpay";
import { Typography, Button, Divider, List, ListItem, ListItemText } from "@material-ui/core";

const PaymentForm = ({next, backStep, shippingData, cartValue, discounted, user }) => {
    const [totalPrice, setTotalPrice]= useState(0);
    const [oldPrice, setOldPrice]= useState(0);
    const [totalItems, setTotalItems]= useState(0);
    const Razorpay = useRazorpay();

    const handlePayment = (price) => {
      const options = {
        key: "rzp_test_GsYLne4Fqnrf4m",
        amount: price*100,
        currency: "INR",
        name: "ShoeBox",
        description: "Test Transaction",
        image: "https://cdn.productreview.com.au/resize/listing-picture/d16cb598-6f4d-3c9c-b824-53b05f6e7aeb?width=1200&height=630&v=2",
        handler: (res) => {
          next(res.razorpay_payment_id);
        },
        prefill: {
          name: user.name,
          email: user.email
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    };
    
    useEffect(()=>{
     let items= 0;
     let price = 0;
     cartValue.forEach(item => {
         items += item.qty;
         price += item.qty * item.price;
     });
     if (discounted) {
      setOldPrice(price);
      setTotalPrice(discounted);
  } else setTotalPrice(price);
     setTotalItems(items);
    },[cartValue,discounted,totalPrice,totalItems ])

  const handleSubmit = () => {
    handlePayment(totalPrice);
    // nextStep();
  };
  return (
    <>
      <List disablePadding>
        {cartValue.map((product) => (
          <ListItem style={{ padding: "10px 0" }} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.qty}`}
            />
            <Typography variant="body2">
            &#8377; {product.qty * product.price}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            &#8377;
            {(discounted) ?
              <del style={{color: "red"}}>{oldPrice}</del>: <del></del>}
            &nbsp;{totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={backStep}>
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Pay Now
        </Button>
      </div>
    </>
  );
};

export default PaymentForm;