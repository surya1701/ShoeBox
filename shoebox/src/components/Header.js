import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Login from "../Login";
import { mobile } from "../responsive";

function Header({ cartValue, user }) {
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    let items = 0;
    cartValue.forEach(item => {
      items += item.qty;
    });
    setTotalItems(items);
  }, [cartValue, totalItems])

  return (
    <Container className="sticky-top">
      <Wrapper>
        <Left>
          <MenuItem><Link to="/explore" style={{ color: '#265db5', textDecoration: 'none' }}>Explore</Link></MenuItem>
          <MenuItem>
            {(user) ?
              <Link to="/profile" style={{ color: '#265db5', textDecoration: 'none' }}>Profile</Link>
              : <p></p>}
          </MenuItem>
          <MenuItem>
            <div className="g-signin">
              <Login />
            </div>
          </MenuItem>
        </Left>
        <Center>
          <Logo>
            <Link to="/" style={{ color: '#1ce890', textDecoration: 'none', fontStyle: 'italic', fontWeight: '600', letterSpacing: '1.2' }}>ShoeBox</Link>
          </Logo>
        </Center>
        <Right>
          <MenuItem>
            <Badge color="primary">
              <Link to="/cart">
                <ShoppingCartOutlined />
                <CartCount>
                  {totalItems}
                </CartCount>
              </Link>
            </Badge>
          </MenuItem>

        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 65px;
  background-color: #fffdd0;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
  
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  text-color: #000000;
  text-transform: uppercase;

  ${mobile({ fontSize: "24px" })}

`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 28px;
  cursor: pointer;
  margin-left: 25px;
  text-transform: uppercase;

  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
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