import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column" })}
  `;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;

const Logo = styled.h1``;

const Desc = styled.p`
    margin: 20px 0px;
  `;

const SocialContainer = styled.div`
    display: flex;
  `;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}
  `;

const Title = styled.h3`
    margin-bottom: 30px;
  `;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
  `;

const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ backgroundColor: "#fff8f8" })}
  `;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;

const Payment = styled.img`
      width: 50%;
  `;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>
          <Link to="/" style={{ color: '#1ce890', textDecoration: 'none', fontStyle: 'italic', fontWeight: '600', letterSpacing: '1.2' }}>ShoeBox</Link>
        </Logo>
        <Desc>
          Welcome to the world of shoes.Choose the best from the list for comfort of your legs.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem><Link to="/" style={{ textDecoration: 'none' }} className="pbtn">Home</Link></ListItem>
          <ListItem><Link to="/cart" style={{ textDecoration: 'none' }} className="pbtn">Cart</Link></ListItem>
          <ListItem><Link to="/brand/Men" style={{ textDecoration: 'none' }} className="pbtn">Men's Fashion</Link></ListItem>
          <ListItem><Link to="/brand/Women" style={{ textDecoration: 'none' }} className="pbtn">Women's Fashion</Link></ListItem>
          <ListItem><Link to="/profile" style={{ textDecoration: 'none' }} className="pbtn">My Account</Link></ListItem>
          <ListItem><Link to="" style={{ textDecoration: 'none' }} className="pbtn">Wishlist</Link></ListItem>
          <ListItem><Link to="" style={{ textDecoration: 'none' }} className="pbtn">Terms</Link></ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 113 Boys Hostel , IIIT SRI City 98336
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +123 4567 890
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> contact@shoebox.dev
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;