import { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import BrandPage from '../../components/BrandPage'

function Brand({user, brand, brands}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
            <BrandPage brand={brand} brands={brands} show={show} handleClose={handleClose} user={user}/>
            <Wrap onClick={handleShow}>
                <img src={brand.logo} alt={brand.name + "-logo"}/>
            </Wrap>
        </>
    )
}
const mapStateToProps=(state)=>{
    return {
        user: state.auth.googleUser
    }
}
export default connect(mapStateToProps)(Brand);

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
        z-index: 2;
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