import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined, PersonOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Login from "../Login";

function Header({ cartValue, user }) {
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    let items = 0;
    cartValue.forEach(item => {
      items += item.qty;
    });
    setTotalItems(items);
  }, [cartValue, totalItems])
  window.onscroll = () => {
    if (document.getElementById("nav-header"))
    if (document.documentElement.scrollTop === 0)
      document.getElementById("nav-header").classList.remove("scroll-nav");
    else
      document.getElementById("nav-header").classList.add("scroll-nav");
  }

  return (
    <Navbar sticky="top" variant="dark" expand="lg" className="border-bottom border-dark" id="nav-header">
    <Container>
    <Navbar.Brand><Link to="/" style={{ color: '#1ce890', textDecoration: 'none', fontStyle: 'italic', fontWeight: '600', letterSpacing: '1.2' }}>ShoeBox</Link></Navbar.Brand>
    <Navbar.Toggle className="ms-auto" aria-controls="basic-navbar-nav" style={{backgroundColor: "#39C0ED"}}/>
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mx-auto">
      <Nav.Link><Link to="/" style={{ color: '#265db5', textDecoration: 'none' }}>Home</Link></Nav.Link>
      <Nav.Link><Link to="/explore" style={{ color: '#265db5', textDecoration: 'none' }}>Explore</Link></Nav.Link>
      {(user) ?
      <Nav.Link><Link to="/profile" style={{ color: '#265db5', textDecoration: 'none' }}>Profile <PersonOutline/></Link></Nav.Link> : <p></p>}
      <Nav.Link>
      <div className="g-signin">
        <Login />
      </div>
      </Nav.Link>
    </Nav>
    </Navbar.Collapse>
    <Nav className="ml-2">
      <Nav.Link>
        <Badge color="primary">
          <Link to="/cart">
            <ShoppingCartOutlined />
            <CartCount>
              {totalItems}
            </CartCount>
          </Link>
        </Badge>
      </Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  );
};
const CartCount = styled.span`
  font-size: .6rem;
  position: absolute;
  top: -6px;
  right: -5px;
  width: 15px;
  height: 15px;
  color: #fff;
  background-color: #418deb;
  border-radius: 50%;
  text-align: center;
`;

const mapStateToProps = (state) => {
  return {
    cartValue: state.cart.cart,
    user: state.auth.googleUser
  }
}
export default connect(mapStateToProps)(Header);