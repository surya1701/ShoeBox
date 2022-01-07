import React, { useEffect } from "react";
import { Navigate, useLocation } from 'react-router-dom'
import {store} from "../../app/store";

const Confirmation = () => {
    const data = useLocation().state;
    useEffect(()=>{
        const today = new Date();
        const date = today.getDate() + "/" + (today.getMonth()+1) +  "/"+ today.getFullYear()
                    + " " +today.getHours() + ":"+today.getMinutes() +":"+ today.getSeconds();
        fetch("http://localhost:3001/users/"+data.data.email)
            .then(res => res.json())
            .then(result => {
            let all_orders = [];
            if (result.orders)
            all_orders = [...result.orders, {cart:[...data.cart], date:date}];
            else
            all_orders = [{cart:[...data.cart], date:date}];
            console.log(result);
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
                });
            store.dispatch({ type: 'GOOGLE_AUTH_SUCCESS', payload: { user: { ...result, orders: [...all_orders]} } });
    })})
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