import React from 'react'
import styled from 'styled-components'
import { connect } from "react-redux"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemDisplay from '../../components/ItemDisplay';

function NewArrival({shoesValue}) {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    }
    return (
        <Container>
            <h4>Puma</h4>
            <Content>
                {/* {shoesValue.map((item) => (item.brand === "Puma") && <ItemDisplay item={{...item}}/>)} */}
                {shoesValue.filter((item) => (item.brand === "Puma")).slice(-4).map((item) => <ItemDisplay item={{...item}}/>)}
            </Content>
        </Container>
    )
}
const mapStateToProps=(state)=>{
    return {
        shoesValue: state.cart.ShoesData
    }
}
export default connect(mapStateToProps)(NewArrival);

const Container = styled.div`
margin-top: 20px;
margin-bottom: 30px;
`

const Content = styled.div`
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0,1fr));
`