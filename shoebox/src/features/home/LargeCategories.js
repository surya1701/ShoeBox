import React from 'react'
import styled from 'styled-components'
import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LargeCategories = () => {

    return (
        <CardDiv className='row g-0 mb-5'>
            <div className='col-6 p-3 text-center'>
                <Link to="/brand/Men">
                <Card style={{height: "40vw", overflow: "hidden"}}>
                    <Card.Img variant="top" src="https://i.pinimg.com/564x/e0/fa/9e/e0fa9e571ff73f3ba6e49292e50ae0eb.jpg" />
                    <Card.Body>
                    <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
                        <h1 className='display-1 text-white'>Men's</h1>
                    </Card.ImgOverlay>
                    </Card.Body>
                </Card>
                </Link>
            </div>
            <div className='col-6 p-3 text-center'>
                <Link to="/brand/Women">
                <Card style={{height: "40vw", overflow: "hidden"}}>
                    <Card.Img variant="top" src="https://i.pinimg.com/originals/1d/d6/61/1dd661660d9ce8e66180cbd00bd41d2a.jpg" />
                    <Card.Body>
                    <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
                        <h1 className='display-1 text-white'>Women's</h1>
                    </Card.ImgOverlay>
                    </Card.Body>
                </Card>
                </Link>
            </div>
        </CardDiv>
    )
}

export default LargeCategories;
const CardDiv = styled.div`
div {
    div {
        overflow: hidden;
        img {
            height: 100%;
            object-fit: cover;
            transition: 0.5s all ease-in-out;
        }
    }
    div:hover {
    img {
        transform: scale(1.2);
    }
}
}
`;