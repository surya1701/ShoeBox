
import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { store } from "./app/store";

const clientId = "88496550643-kdkgke1hc694sk4d0gngrbv5m0l2l3fi.apps.googleusercontent.com";

function Login() {

    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    const onLoginSuccess = (res) => {
        // console.log('Login Success:', res.profileObj);
        fetch("http://localhost:3001/users/"+res.profileObj.givenName)
        .then(res => res.json())
        .then(result => {
            if (! result.name) {
                fetch("http://localhost:3001/users", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        ...res.profileObj,
                        "id": res.profileObj.givenName,
                        "liked": [],
                        "followed": []
                    }
                )});
            }
            fetch("http://localhost:3001/users/"+res.profileObj.givenName)
            .then(res => res.json())
            .then(result => {if(result) store.dispatch({type:'GOOGLE_AUTH_SUCCESS', payload: 
            {user: {...res.profileObj, liked: result.liked, followed: result.followed}}})})
        })
        setShowloginButton(false);
        setShowlogoutButton(true);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
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
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}

            {showlogoutButton ?
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Sign Out"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null
            }
        </div>
    );
}
export default Login;