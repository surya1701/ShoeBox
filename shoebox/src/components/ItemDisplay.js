import styled from 'styled-components'
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ItemDisplay = ({item}) => {
    const product = {...item};
    return (
    (typeof product.image === 'string') ?
    <>
        <Wrap>
        <Link to={{ pathname: "/product", search: "?key="+product.id }}>
            <img src={product.image} alt={"product-image-"+product.id}/>
        </Link>
        </Wrap>
    </> :
    <> 
        <Wrap>
        <Link to={{ pathname: "/product", search: "?key="+product.id }}>
            <img src={product.image[0]} alt={"product-image-"+product.id}/>
        </Link>
        </Wrap>
    </>
    )
}
const mapStateToProps=(state)=>{
    return {
        shoesValue: state.cart.ShoesData
    }
}
export default connect(mapStateToProps)(ItemDisplay);

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