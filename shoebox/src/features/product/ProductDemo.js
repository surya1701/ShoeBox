import { Divider } from "@material-ui/core";
import { store } from "../../app/store";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ItemDisplay from "../../components/ItemDisplay";
import FormInputRadio from "../../components/SizeForm";
import { Accordion, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ProductCarousel from "../../components/ProductCarousel";
const queryString = require('query-string');

const ProductDemo = ({ shoesValue }) => {
  const methods = useForm();
  const location = useLocation()
  const [item, setItem] = useState(null);
  const [like, setLike] = useState(false);
  const handleLike = (event) => {
    if (event.target.checked) {
      fetch("http://localhost:3001/liked", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: item.key })
      });
      setLike(true);
    } else {
      fetch("http://localhost:3001/liked/" + item.key, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      setLike(false);
    }
  }
  useEffect(() => {
    const { key } = queryString.parse(location.search);
    shoesValue.forEach(element => {
      if (parseInt(element.key) === parseInt(key)) setItem({ ...element });
    });
  }, [shoesValue, location]);

  const addToCart = (data) => {
    store.dispatch({ type: 'ADD_TO_CART', payload: { id: item.key, size: data['size'] } });
  }

  return (
    (item) ?
      <div>
        <Header />
        <div className="row g-0 p-1 mt-20">
          <div className="col-md-6 col-12 p-1 text-center" >
            <ProductCarousel images={item.image} />
          </div>
          <div className="col-md-6 col-12 p-1">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Know Your Shoe</Accordion.Header>
                <Accordion.Body>
                  <Title>{item.name}</Title>
                  {/* <Title>name</Title> */}
                  <Desc>
                    <strong><i>{item.brand}</i></strong><br />
                    A shoe is an item of footwear intended to protect and comfort the human foot.
                    Shoes are also used as an item of decoration and fashion. The design of shoes has varied enormously
                    through time and from culture to culture, with form originally being tied to function.
                  </Desc>
                  <Price>&#8377; {item.price}</Price>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Take Away</Accordion.Header>
                <Accordion.Body>
                  <FormProvider {...methods}>
                    <form
                      onSubmit={methods.handleSubmit((data) =>
                        addToCart({ ...data })
                      )}
                    >
                      <FormInputRadio name={"size"} control={methods.control} />
                      <br />
                      <Button type="submit" variant="success" className="mb-2">
                        Add To Cart
                      </Button>
                    </form>
                  </FormProvider>
                  <FormControlLabel control={<Checkbox checked={like} onClick={handleLike} icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />} name="checkedH" />} style={{ float: "right", marginRight: "70px" }} />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        <Container>
          <h4 className="ml-3">Others in {item.brand}</h4>
          <Content>
            {shoesValue.filter((i) => (i.brand === item.brand && i.name !== item.name)).slice(-4).map((i) => <ItemDisplay item={{ ...i }} />)}
          </Content>
        </Container>
        <Divider />
        <Footer />
      </div>
      :
      <div>
        <Header />
        <div className="text-center mt-2 text-danger">
          <h1>Request Not Found</h1>
        </div>
        <Container>
          <h4 className="ml-3">Other Products</h4>
          <Content>
            {shoesValue.slice(-4).map((i) => <ItemDisplay item={{ ...i }} />)}
          </Content>
        </Container>
        <Divider />
        <Footer />
      </div>
  );
};
const mapStateToProps = (state) => {
  return {
    shoesValue: state.cart.ShoesData
  }
}

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const Container = styled.div`
margin-top: 20px;
margin-bottom: 30px;
`

const Content = styled.div`
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0,1fr));
`

export default connect(mapStateToProps)(ProductDemo);