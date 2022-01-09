import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from 'react-router-dom'
import {store} from "../../app/store";
import emailjs from '@emailjs/browser';

const Confirmation = () => {
    const data = useLocation().state;
    const [amount, setAmount] = useState(data.amount)
    useEffect(()=>{
        const today = new Date();
        const date = today.getDate() + "/" + (today.getMonth()+1) +  "/"+ today.getFullYear()
                    + " " +today.getHours() + ":"+today.getMinutes() +":"+ today.getSeconds();
        if (! amount) {
            let price = 0;
            data.cart.forEach(item => {
                price += item.qty * item.price;
            });
            setAmount(price);
        }
        fetch("http://localhost:3001/users/"+data.data.email)
            .then(res => res.json())
            .then(result => {
            let all_orders = [];
            if (result.orders)
            all_orders = [...result.orders, {cart:[...data.cart], date:date, amount:amount, details: data.data}];
            else
            all_orders = [{cart:[...data.cart], date:date, amount:amount, details: data.data}];
            fetch("http://localhost:3001/users/" + data.data.email, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            ...result,
                            "orders": [...all_orders]
                        }
                    )
            })
            .then(res => {
                if (amount) {
                    var templateParams = {
                        email: data.data.email,
                        cart: data.cart.map((i)=>i.name + " : Size " +  i.size + " x " + i.qty),
                        amount: amount,
                        date: data.date,
                        paymentId: data.data.paymentId
                    };
                    emailjs.send('service_b5ua1p9','template_oz8htss', templateParams, "user_IBylxEhLb5UbSS4J8iyTk")
                        .then(function(response) {
                        console.log('Order Confirmation Sent !', response.status, response.text);
                        }, function(err) {
                        console.log('Email Error', err);
                        });
                }
            });
            store.dispatch({ type: 'GOOGLE_AUTH_SUCCESS', payload: { user: { ...result, orders: [...all_orders]} } });
    })}, [data, amount, setAmount])
    return (
        (data === null) ?
        <Navigate to="/" /> :
        <div className="jumbotron text-center">
        <h1 className="display-3">Thank You!</h1>
        <p className="lead"><strong>Please check your email</strong> for further information on your order.</p>
        <hr/>
        <p>Name: {data.data["firstName"]} {data.data["lastName"]}</p>
        <p>Address: {data.data["address"]}</p>
        <p>Email: {data.data["email"]}</p>
        <p>Final Amount: &#8377; {amount}</p>
        <ul>
        {data.cart.map((item) => <li key={item.id}>{item["name"]}: Size {item["size"]} x {item["qty"]}</li>)}
        </ul>
        <p className="lead">
            <a href="/" >Home</a>
        </p>
        </div>
    );
}

export default Confirmation;