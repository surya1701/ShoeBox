import React from "react";
import { Link, useLocation } from 'react-router-dom'

const Confirmation = () => {
    const {data, cart} = useLocation().state;
    
    return (
        <div className="jumbotron text-center">
        <h1 className="display-3">Thank You!</h1>
        <p className="lead"><strong>Please check your email</strong> for further instructions on how to complete your account setup.</p>
        <hr/>
        <p>First Name: {data.data["firstName"]}</p>
        <ul>
        {data.cart.map((item) => <li>{item["name"]}</li>)}
        </ul>
        <p className="lead">
            <Link to="/" >Home</Link>
        </p>
        </div>
    );
}

export default Confirmation;