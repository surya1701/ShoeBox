import {useState} from 'react'
import styled from 'styled-components'
import ImgSlider from '../../components/ImgSlider'
import Brand from '../../components/Brand'
import Header from '../../components/Header'
import NewArrival from './NewArrival'
import SlipOns from './SlipOns'
import LargeCategories from './LargeCategories'
import Footer from '../../components/Footer'

function Home() {
    return (
        <div>
            <Header />
            <Container>
                <ImgSlider />
                <Brand />
                <NewArrival />
                <SlipOns />
                <br />
                <Advert>
                    <img className='gif' src='/images/adidas-ad.gif' />
                    <img className='image' src='/images/adidas-ad-image.jpg' />
                </Advert>

                <LargeCategories />
                <Footer />
            </Container>
        </div>
    )
}

export default Home;

const Container = styled.main`
    min-height : calc(100vh - 70px);
    padding : 0 calc(3.5vw + 5px);
    position: relative;
    overflow-x: hidden;
    
    &:before{
       
        content: "";
        position: absolute;
        top : 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
`
const Advert = styled.div`
width:100vw;
padding:5vw 10vw 5vw 10vw;
.gif {
    display: none;
}
.image {
    display:block;
}
    &:hover {
        .gif {
            display:block;
        }       
        .image {
            display:none;
        }
    }
`;