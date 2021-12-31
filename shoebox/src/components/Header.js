import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { mobile } from "../responsive";
//import { useSelector } from "react-redux";
//import { Link } from "react-router-dom";

function Header({ cartValue }) {
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
          {/* <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer> */}
          <MenuItem><Link to="/explore">Explore</Link></MenuItem>
        </Left>
        <Center>
          <Logo>
            <Link to="/" style={{color: "black"}}>ShoeBox</Link>
          </Logo>
        </Center>
        <Right>
          <MenuItem>LOGIN</MenuItem>
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
  height: 60px;
  background-color: white;
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

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
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
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
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
    cartValue: state.cart.cart
  }
}
export default connect(mapStateToProps)(Header);