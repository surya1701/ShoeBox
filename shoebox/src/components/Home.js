import React from 'react'
import styled from 'styled-components'
import ImgSlider from './ImgSlider'
import Brand from './Brand'
import Header from './Header'
import NewArrival from './NewArrival'
import SlipOns from './SlipOns'

import { store } from '../app/store'
import { PlusCircleIcon } from '../assets/icons';

function Home({ cartValue }) {
    const addToCart = (idValue) => {
        store.dispatch({ type: 'ADD_TO_CART', payload: { id: idValue } });
    }
    return (
        <div>
            <Header />
            <Container>
                <ImgSlider />
                <Brand />
                <button
                    onClick={() => addToCart(1)}
                    className={"btn btn-primary btn-sm mr-2 mb-1"}>
                    Adidas<PlusCircleIcon width={"20px"} />
                </button>
                <button
                    onClick={() => addToCart(2)}
                    className={"btn btn-primary btn-sm mr-2 mb-1"}>
                    Nike<PlusCircleIcon width={"20px"} />
                </button>
                <NewArrival />
                <SlipOns />
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
