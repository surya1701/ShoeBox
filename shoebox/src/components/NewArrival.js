import React from 'react'
import styled from 'styled-components'
import { useSelector } from "react-redux"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
                <Wrap>
                    <img src="https://wallpaperaccess.com/full/1252085.jpg" />
                </Wrap>
                <Wrap>
                    <img src="https://i.pinimg.com/736x/dc/c3/a8/dcc3a8ad7715b7c82c07fbb8d5915b55--adidas-shoes-adidas-neo.jpg" />
                </Wrap>
                <Wrap>
                    <img src="https://media.istockphoto.com/photos/adidas-blue-shoes-for-women-picture-id543052632?k=20&m=543052632&s=612x612&w=0&h=w5295upJmjPSCrGfygyi4zZrX6xajCrLvFcr8IeUH1g=" />
                </Wrap>
                <Wrap>
                    <img src="https://media.istockphoto.com/photos/adidas-superstar-picture-id458068097?k=20&m=458068097&s=612x612&w=0&h=57J_lM_EMo1ddJZsWlbWgJMy5Nr9XlLMqRA4MpbRMX4=" />
                </Wrap>

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

const Wrap = styled.div`
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    border: 3px solid rgba(249, 249, 249, 0.1);
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition : all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &:hover {
        transform: scale(1.05);
        border-color: rgba(249,249,249,0.8);
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
        rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    }

`