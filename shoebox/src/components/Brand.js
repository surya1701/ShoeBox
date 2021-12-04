import React from 'react'
import styled from 'styled-components'

function Brand() {
    return (
        <Container>
            <Wrap>
                <img src="/images/addi.jpg" />

            </Wrap>
            <Wrap>
                <img src="/images/nike.png" />

            </Wrap>
            <Wrap>
                <img src="/images/puma.png" />

            </Wrap>
            <Wrap>
                <img src="/images/reebok.png" />

            </Wrap>
            <Wrap>
                <img src="/images/viewers-marvel.png" />

            </Wrap>

        </Container>
    )
}

export default Brand

const Container = styled.div`
    margin-top: 30px;
    display: grid;
    padding: 30px 0 26px;
    grid-gap: 25px;
    grid-template-columns: repeat(5, minmax(0, 1fr));
`

const Wrap = styled.div`
    position: relative;
    padding-top: 56.25%;
    overflow: hidden;
    border: 3px solid rgba(249, 249, 249, 0.1);
    cursor: pointer;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition : all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    object-position: center;

    img {
        inset: 0px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 1;
        z-index: 1500;
        diplay: block;
        border-radius: 10px;
        transition: opacity 500ms ease-in-out 0s;
        position: absolute;
        top: 0;
    }

   

    &:hover {
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
        rgb(0 0 0 / 72%) 0px 30px 22px -10px;
        transform : scale(1.05);
        border-color: rgba(249, 249, 249, 0.8);
    }
`