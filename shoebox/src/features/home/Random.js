import React from 'react'
import styled from 'styled-components'
import { connect } from "react-redux"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemDisplay from '../../components/ItemDisplay';

function Random({shoesValue}) {
    return (
        <Container>
            <h4>Our Picks</h4>
            <Content>
                {shoesValue.filter((item) => (Math.random() > 0.5)).slice(-4).map((item) => <ItemDisplay key={item.id} item={{...item}}/>)}
            </Content>
        </Container>
    )
}

const mapStateToProps=(state)=>{
    return {
        shoesValue: state.explore.ShoesData
    }
}
export default connect(mapStateToProps)(Random);

const Container = styled.div`
margin-top: 30px;
margin-bottom: 20px;

`

const Content = styled.div`
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0,1fr));
`