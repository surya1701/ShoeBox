import { Table, Tabs, Tab, Form, Button } from "react-bootstrap";
import React from "react";
import { useEffect, useState } from "react";
import Header from './Header';

function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [shoeList, setShoeList] = useState(0);
  const [password, setPassword] = useState();
  const [passwordConf, setPasswordConf] = useState();
  function validateForm() {
    return (password && password === passwordConf);
  }
const onRegister = (e) => {
    e.preventDefault()
    fetch('http://localhost:3001/admin/register', {  
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "name": e.target.name.value,
            "email" : e.target.email.value,
            "password" : e.target.password.value
        }),
    })
}
const onLogin = (e) => {
    e.preventDefault()
    fetch('http://localhost:3001/admin/login', {  
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "email" : e.target.email.value,
            "password" : e.target.password.value
        }),
    })
    .then(res => res.json())
    .then(result => {
        setToken(result.token);
    }
    )};
    useEffect(() => {
        fetch("http://localhost:3001/admin", {headers: {'x-access-token': token}})
        .then(res => res.json())
        .then(result => {
            if (result) {
                setShoeList(result);
                setLoggedIn(true);
        }
      })
  }, [token])
  return (
    <>
        <Header/>
        {(loggedIn) ?
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Shoe</th>
                <th>Brand</th>
                </tr>
            </thead>
            <tbody>
                {shoeList.map((item) => 
                <tr>
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                </tr>
                )}
            </tbody>
        </Table> : 
        <Tabs defaultActiveKey="login" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="login" title="Login">
            <div className="Login">
                    <Form onSubmit={onLogin}>
                        <Form.Group size="lg" className="m-3" controlId="formHorizontalEmailLogin">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" placeholder="Email" name={"email"} />
                        </Form.Group>
                        <Form.Group size="lg" className="m-3" controlId="formHorizontalPasswordLogin">
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control type="password" placeholder="Password" name={"password"}/>
                        </Form.Group>
                        <Button block className="m-3" size="lg" type="submit">
                            Login
                        </Button>
                    </Form>
                    <hr />
                </div>
            </Tab>
            <Tab eventKey="register" title="Register">
                <div className="Register">
                    <Form onSubmit={onRegister}>
                        <Form.Group size="lg" className="m-3" controlId="formHorizontalName">
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control type="text" placeholder="Name" name={"name"} />
                        </Form.Group>
                        <Form.Group size="lg" className="m-3" controlId="formHorizontalEmail">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" placeholder="Email" name={"email"} />
                        </Form.Group>
                        <Form.Group size="lg" className="m-3" controlId="formHorizontalPassword">
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control type="password" placeholder="Password" name={"password"}
                                onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group size="lg" className="m-3" controlId="formHorizontalPassword_Check">
                            <Form.Label>
                                Password Confirmation
                            </Form.Label>
                            <Form.Control type="password" placeholder="Password Confirmation" name={"password_confirmation"}
                                onChange={(e) => setPasswordConf(e.target.value)} />
                        </Form.Group>
                        <Button block className="m-3" size="lg" type="submit" disabled={!validateForm()}>
                            Register
                        </Button>
                    </Form>
                    <hr />
                </div>
            </Tab>
        </Tabs>}
    </>
  );
};

export default Admin;