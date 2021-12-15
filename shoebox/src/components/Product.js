import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from "react-redux"
import {Offcanvas} from "react-bootstrap"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { store } from '../app/store'
import { useForm, FormProvider } from "react-hook-form";
import {Button} from "react-bootstrap"
import FormInputRadio from './SizeForm';
import ProductCarousel from './ProductCarousel';

const Product = ({item, show, handleClose}) => {
    const methods = useForm();

    const addToCart = (data) => {
        console.log(data);
        store.dispatch({ type: 'ADD_TO_CART', payload: { id: item.key, size: data['size']} });
        handleClose();
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
    const images = image
    return (
        <Offcanvas show={show} onHide={handleClose} placement='end' className='text-center'>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>{brand}</Offcanvas.Title>
            </Offcanvas.Header>
                {/* <ImgSlider/> */}
            <Offcanvas.Body>
            <ProductCarousel images={images}/>
            <br/>
            <h3 className='display-6'>{name}</h3>
            <h4>&#8377; {price}</h4>
            <br/>
            <FormProvider {...methods}>
                <form
                onSubmit={methods.handleSubmit((data) =>
                    addToCart({...data})
                )}
                >
                <FormInputRadio name={"size"} control={methods.control}/>
                <br/>
                <Button type="submit" variant="success">
                Add To Cart
                </Button>
                </form>
            </FormProvider>
            </Offcanvas.Body>
        </Offcanvas>    
    )
}
export default Product;