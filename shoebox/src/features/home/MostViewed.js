import React from 'react'
import styled from 'styled-components'
import { connect } from "react-redux"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemDisplay from '../../components/ItemDisplay';

function MostViewed({shoesValue}) {
    return (
        <Container>
            <h4>Most Viewed</h4>
            <Content>
                {shoesValue.sort((a,b) => (a.views < b.views) ? 1 : ((b.views < a.views) ? -1 : 0)).slice(0,4).map((item) => <ItemDisplay key={item.id} item={{...item}}/>)}
            </Content>
        </Container>
    )
}
const mapStateToProps=(state)=>{
    return {
        shoesValue: state.explore.ShoesData
    }
}
export default connect(mapStateToProps)(MostViewed);

const Container = styled.div`
margin-top: 20px;
margin-bottom: 30px;
`

const Content = styled.div`
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0,1fr));
`