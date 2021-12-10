import React from 'react'
import styled from 'styled-components';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImgSlider() {

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    }
    return (
        <Carousel {...settings}>
            <Wrap>
                <img src="https://lh3.googleusercontent.com/proxy/b29uIB1uaWdU9UVP08LMJJaBQ8rrTsTSgkgUWhUxgGezuzqrTOQcBvRUQhW8WwnOZo_Q9NdOn6Jd7RxwG9XcBbN2WX6SAwKxrOKjrCkZR6FK3Js1A-0GySTCSquqFuEwGDZFgHH1NOMc3PzcOSM2f7F1Qw" />
            </Wrap>
            <Wrap>
                <img src="https://wallpaperaccess.com/full/1252085.jpg" />
            </Wrap>
            <Wrap>
                <img src="https://c1.wallpaperflare.com/preview/60/37/209/feet-trainers-adidas-vigenette.jpg" />
            </Wrap>
            <Wrap>
                <img src="https://www.teahub.io/photos/full/82-828480_adidas-shoes-computer-wallpapers-adidas-shoes-picture-adidas.jpg" />
            </Wrap>
        </Carousel>
    )
}

export default ImgSlider

const Carousel = styled(Slider)`
    margin-top: 20px;
    ul li button {
        &:before {
            font-size: 10px;
            color: rgb(0, 0, 0);
        }
    }
    li.slick-active button:before {
        color: black;
    }

    .slick-list {
        overflow: visible;
    }
    button {
        z-index: 1;
        color: black;
    }

`
const Wrap = styled.div`
    cursor: pointer;
    img {
        border: 4px solid transparent;
        border-radius: 4px;
        width: 1200px;
        height: 400px;
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        transition-duration: 250ms;

        &:hover {
            border: 4px solid rgba(249, 249, 249, 0.8);
        }
    }
`