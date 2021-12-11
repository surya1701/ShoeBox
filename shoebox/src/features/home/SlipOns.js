import React from 'react'
import styled from 'styled-components'
import { useSelector } from "react-redux"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemDisplay from '../../components/ItemDisplay';

function SlipOns() {
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
            <h4>Slip Ons</h4>
            <Content>
                <ItemDisplay id={1} url="https://images.vans.com/is/image/Vans/EYEBWW-HERO"/>
                <ItemDisplay id={1} url="https://scene7.zumiez.com/is/image/zumiez/pdp_hero/Vans-Classic-Van-Doren-Hoffman-Mens-Slip-On-Shoes-_259880-front.jpg"/>
                <ItemDisplay id={1} url="https://images.vans.com/is/image/Vans/EYEBWW-HERO"/>
                <ItemDisplay id={1} url="https://scene7.zumiez.com/is/image/zumiez/pdp_hero/Vans-Classic-Van-Doren-Hoffman-Mens-Slip-On-Shoes-_259880-front.jpg"/>
            </Content>
        </Container>
    )
}

export default SlipOns

const Container = styled.div`
margin-top: 30px;
margin-bottom: 20px;

`

const Content = styled.div`
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0,1fr));
`