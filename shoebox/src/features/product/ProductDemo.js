import { Divider } from "@material-ui/core";
import { store } from "../../app/store";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ItemDisplay from "../../components/ItemDisplay";
import { mobile } from "../../responsive";
import FormInputRadio from "../../components/SizeForm";
import { Accordion, Button } from "react-bootstrap";
import {connect} from "react-redux";
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ProductCarousel from "../../components/ProductCarousel";
const queryString = require('query-string');

const ProductDemo = ({shoesValue}) => {
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
          body: JSON.stringify({id: item.key})
          });
          setLike(true);
      } else {
          fetch("http://localhost:3001/liked/"+item.key, {
              method: "DELETE",
              headers: {
              "Content-Type": "application/json"
          }
          });
          setLike(false);
      }
  }
  useEffect(() => {
    const {key} = queryString.parse(location.search);
    shoesValue.forEach(element => {
      if (parseInt(element.key) === parseInt(key)) setItem({...element});
    });
  }, [shoesValue, location]);

  const addToCart = (data) => {
    store.dispatch({ type: 'ADD_TO_CART', payload: { id: item.key, size: data['size']} });
  }

  return (
    (item) ?
    <div>
      <Header />
      <div className="row g-0 p-1 mt-20">
        <div className="col-md-6 col-12 p-1 text-center" >
          <ProductCarousel images={item.image}/>
        </div>
        <div className="col-md-6 col-12 p-1">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Know Your Shoe</Accordion.Header>
              <Accordion.Body>
                <Title>{item.name}</Title>
                {/* <Title>name</Title> */}
                <Desc>
                  <strong><i>{item.brand}</i></strong><br/>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
                  iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
                  tristique tortor pretium ut. Curabitur elit justo, consequat id
                  condimentum ac, volutpat ornare.
                </Desc>
                <Price>&#8377; {item.price}</Price>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Take Away</Accordion.Header>
              <Accordion.Body>
                {/* <FilterContainer> */}
                  <FormProvider {...methods}>
                    <form
                    onSubmit={methods.handleSubmit((data) =>
                        addToCart({...data})
                    )}
                    >
                    <FormInputRadio name={"size"} control={methods.control}/>
                    <br/>
                    <Button type="submit" variant="success">
                    Add To Cart
                    </Button>
                    </form>
                  </FormProvider>
                  <FormControlLabel control={<Checkbox checked={like} onClick={handleLike} icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />} name="checkedH" />} style={{ float: "right" }} />
                  {/* <Filter>
                    <FilterTitle>Color</FilterTitle>
                    <FilterColor color="black" />
                    <FilterColor color="darkblue" />
                    <FilterColor color="gray" />
                  </Filter>
                  <Filter>
                    <FilterTitle>Size</FilterTitle>
                    <FilterSize>
                      <FilterSizeOption>6</FilterSizeOption>
                      <FilterSizeOption>7</FilterSizeOption>
                      <FilterSizeOption>8</FilterSizeOption>
                      <FilterSizeOption>9</FilterSizeOption>
                      <FilterSizeOption>10</FilterSizeOption>
                    </FilterSize>
                  </Filter> */}
                {/* </FilterContainer> */}
                <AddContainer>
                  <AmountContainer>
                    <Remove />
                    <Amount>1</Amount>
                    <Add />
                  </AmountContainer>
                  <ButtonContainer>
                    <Button variant="primary" className="mr-2">ADD TO CART</Button>
                    <Button variant="outline-danger">WishList</Button>
                  </ButtonContainer>
                </AddContainer>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      <Container>
            <h4 className="ml-3">Others in {item.brand}</h4>
            <Content>
                {shoesValue.filter((i) => (i.brand === item.brand && i.name !== item.name)).slice(-4).map((i) => <ItemDisplay item={{...i}}/>)}
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
                {shoesValue.slice(-4).map((i) => <ItemDisplay item={{...i}}/>)}
            </Content>
        </Container>
      <Divider />
      <Footer />
    </div>
  );
};
const mapStateToProps=(state)=>{
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

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  flex : 1;
  align-items: center;
  font-weight: 700;
`;
const ButtonContainer = styled.div`
  flex: 1;
`

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  cursor: pointer;
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