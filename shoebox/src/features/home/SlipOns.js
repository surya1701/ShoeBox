import React from 'react'
import styled from 'styled-components'
import { connect } from "react-redux"
import { useSelector } from "react-redux"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemDisplay from '../../components/ItemDisplay';

function SlipOns({shoesValue}) {
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
            <h4>Nike</h4>
            <Content>
                {/* {shoesValue.map((item) => (item.brand === "Nike") && <ItemDisplay item={{...item}}/>)} */}
                {shoesValue.filter((item) => (item.brand === "Nike")).slice(-4).map((item) => <ItemDisplay item={{...item}}/>)}
            </Content>
        </Container>
    )
}

const mapStateToProps=(state)=>{
    return {
        shoesValue: state.cart.ShoesData
    }
}
export default connect(mapStateToProps)(SlipOns);

const Container = styled.div`
margin-top: 30px;
margin-bottom: 20px;

`

const Content = styled.div`
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0,1fr));
`