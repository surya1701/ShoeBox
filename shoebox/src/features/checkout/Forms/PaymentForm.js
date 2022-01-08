import React, {useEffect, useState} from "react";
import { Typography, Button, Divider, List, ListItem, ListItemText } from "@material-ui/core";

const PaymentForm = ({nextStep, backStep, shippingData, cartValue, discounted }) => {
    const [totalPrice, setTotalPrice]= useState(0);
    const [oldPrice, setOldPrice]= useState(0);
    const [totalItems, setTotalItems]= useState(0);
    
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
    nextStep();
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