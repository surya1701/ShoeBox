import React from "react";
import { Link, Navigate, useLocation } from 'react-router-dom'

const Confirmation = () => {
    const data = useLocation().state;
    return (
        (data === null) ?
        <Navigate to="/" /> :
        <div className="jumbotron text-center">
        <h1 className="display-3">Thank You!</h1>
        <p className="lead"><strong>Please check your email</strong> for further information on your order.</p>
        <hr/>
        <p>Name: {data.data["firstName"]} {data.data["lastName"]}</p>
        <p>Address: {data.data["address"]}</p>
        <ul>
        {data.cart.map((item) => <li>{item["name"]} x {item["qty"]}</li>)}
        </ul>
        <p className="lead">
            <Link to="/" >Home</Link>
        </p>
        </div>
    );
}

export default Confirmation;