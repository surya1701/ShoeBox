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
                <img className='img-fluid' src="https://s3.amazonaws.com/nikeinc/assets/12562/Nike_Find_Your_Greatness_Diver_hd_1600.jpg?1343147683" alt="wallpaper-4"/>
            </Wrap>
            <Wrap>
                <img className='img-fluid' src="https://udg-about-puma-prod-endpoint.azureedge.net/-/media/images/newsroom/brand-product-news/2020/2020_09_24_mercedes_speedcatpro/m07.jpg?as=1&h=960&iar=1&w=1920&rev=e74364146ba04fa389110b996eaca642&hash=4889FE8AC5BF8FC8D3BD6F199DCD759A" alt="wallpaper-3"/>
            </Wrap>
            <Wrap>
                <img className='img-fluid' src="https://wallpaperaccess.com/full/680082.png" alt="wallpaper-2"/>
            </Wrap>
            <Wrap>
                <img className='img-fluid' src="https://i0.wp.com/www.opindia.com/wp-content/uploads/2018/09/Hima-Das-Adidas-Ad.jpg?fit=1200%2C1200&ssl=1" alt="wallpaper-1"/>
            </Wrap>
        </Carousel>
    )
}

export default ImgSlider

const Carousel = styled(Slider)`
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
        object-fit: cover;
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        transition-duration: 250ms;

        &:hover {
            border: 4px solid rgba(249, 249, 249, 0.8);
        }
    }
`