import React from 'react'
import styled from 'styled-components'
import { useSelector } from "react-redux"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemDisplay from '../../components/ItemDisplay';

function NewArrival() {
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
            <h4>New Arrival</h4>
            <Content>
                <ItemDisplay id={2} url="https://wallpaperaccess.com/full/1252085.jpg" />
                <ItemDisplay id={2} url="https://i.pinimg.com/736x/dc/c3/a8/dcc3a8ad7715b7c82c07fbb8d5915b55--adidas-shoes-adidas-neo.jpg" />
                <ItemDisplay id={2} url="https://media.istockphoto.com/photos/adidas-blue-shoes-for-women-picture-id543052632?k=20&m=543052632&s=612x612&w=0&h=w5295upJmjPSCrGfygyi4zZrX6xajCrLvFcr8IeUH1g=" />
                <ItemDisplay id={2} url="https://media.istockphoto.com/photos/adidas-superstar-picture-id458068097?k=20&m=458068097&s=612x612&w=0&h=57J_lM_EMo1ddJZsWlbWgJMy5Nr9XlLMqRA4MpbRMX4=" />
            </Content>
        </Container>
    )
}

export default NewArrival

const Container = styled.div`
margin-top: 20px;
margin-bottom: 30px;
`

const Content = styled.div`
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0,1fr));
`