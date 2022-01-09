
import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { store } from "./app/store";
import { Button } from 'react-bootstrap';


// Client Id for Google Auth Sign in
const clientId = "88496550643-kdkgke1hc694sk4d0gngrbv5m0l2l3fi.apps.googleusercontent.com";

/* Login component - In this functional component the Google Sign In and Sign Out methods are written
and rendered using 
- GoogleLogin - for signing in
- GoogleLogout - for signing out
components of react-google-login library
*/

function Login() {

    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    const onLoginSuccess = (res) => {
        // console.log('Login Success:', res.profileObj);
        fetch("http://localhost:3001/users/" + res.profileObj.email)
            .then(res => res.json())
            .then(result => {
                if (!result.name) {
                    const today = new Date();
                    const date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
                    fetch("http://localhost:3001/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(
                            {
                                ...res.profileObj,
                                "id": res.profileObj.email,
                                "since": date,
                                "liked": [],
                                "followed": [],
                                "orders": []
                            }
                        )
                    });
                }
                fetch("http://localhost:3001/users/" + res.profileObj.email)
                    .then(res => res.json())
                    .then(result => {
                        if (result) store.dispatch({
                            type: 'GOOGLE_AUTH_SUCCESS', payload:
                            {
                                user: {
                                    ...res.profileObj, since: result.since,
                                    liked: (result.liked) ? result.liked : [],
                                    orders: (result.orders) ? result.orders : [],
                                    followed: (result.followed) ? result.followed : []
                                }
                            }
                        })
                    })
            })
        setShowloginButton(false);
        setShowlogoutButton(true);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        store.dispatch({ type: 'LOGOUT_GOOGLE_USER' });
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
    };

    return (
        <div>
            {showloginButton ?
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Log In"
                    render={renderProps => (
                        <Button variant="outline-primary" size="sm" onClick={renderProps.onClick}>Log In</Button>
                    )}
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}

            {showlogoutButton ?
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Sign Out"
                    render={renderProps => (
                        <Button variant="outline-danger" size="sm" onClick={renderProps.onClick}>Sign Out</Button>
                    )}
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null
            }
        </div>
    );
}
export default Login;