import { useEffect, useState } from 'react';
import { Card, Image } from 'react-bootstrap'
import { Link } from "react-router-dom"
import BrandPage from '../../components/BrandPage';
import "../../App.css"
function PostItems({ item, brands, user }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const brand = brands.find((brand) => brand.name === item.brand);
    return (
        <>
            <BrandPage brand={brand} brands={brands} show={show} handleClose={handleClose} user={user} />
            <Card border="primary" className='mb-5' style={{ backgroundColor: 'transparent' }}>
                <Card.ImgOverlay style={{height: "fit-content"}}>
                    <Image fluid rounded style={{ height: "3em", float: "left" }}
                        src={brand.logo}
                        onClick={handleShow} role={"button"} />
                    <Card.Text className='h5' style={{float: "right"}}>{item.views} Views</Card.Text>
                </Card.ImgOverlay>
                <Link to={{ pathname: "/product", search: "?key=" + item._id }} style={{textDecoration: 'none'}}>
                    <Card.Img variant="top" style={{ height: "60vh", objectFit: "cover" }} src={"https://pbs.twimg.com/media/ERZaFQ9W4AAyzEo.jpg"}/>
                </Link>
                <Card.Body style={{ zIndex: "2", height: "15vh" }}>
                    <div>
                        <Card.Title className='h3'>
                        Caption Placeholder: New Launch / discounts / new athlete
                        </Card.Title>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default PostItems;