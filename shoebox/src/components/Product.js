import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from "react-redux"
import {Offcanvas} from "react-bootstrap"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { store } from '../app/store'
import { SubscriptionsOutlined } from '@material-ui/icons';
import ImgSlider from './ImgSlider';

const Product = ({item, show, handleClose}) => {
    const addToCart = () => {
        handleClose();
        store.dispatch({ type: 'ADD_TO_CART', payload: { id: item.key } });
    }
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    }
    const {key, name, brand, image, price} = item;
    return (
        <Offcanvas show={show} onHide={handleClose} placement='end' className='text-center'>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>{name}</Offcanvas.Title>
            </Offcanvas.Header>
            {/* <ImgSlider/> */}
            <Offcanvas.Body>
            <img className='img-fluid' src={image}></img>
            <br/>
            <h3 className='display-4'>{brand}</h3>
            <h4>&#8377; {price}</h4>
            <br/>
            <button type="button" className="btn btn-success mb-2" onClick={addToCart}>Add To Cart</button>
            </Offcanvas.Body>
        </Offcanvas>    
    )
}
export default Product;