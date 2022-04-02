import { useState } from 'react';
import { Card, Image } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { ExitToAppSharp } from '@material-ui/icons';
import BrandPage from '../../components/BrandPage';
import "../../App.css"
function PostItems({ post, brands, user }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const brand = brands.find((brand) => brand.name === post.brand);
    return (
        <>
            <BrandPage brand={brand} brands={brands} show={show} handleClose={handleClose} user={user} />
            <Card border="primary" className='mb-5' style={{ backgroundColor: 'transparent' }}>
                <Card.ImgOverlay style={{height: "fit-content"}}>
                    <Image fluid rounded style={{ height: "3em", float: "left" }}
                        src={brand.logo}
                        onClick={handleShow} role={"button"} />
                    <Card.Text className='h5' style={{float: "right"}}>
                        <Link to={{ pathname: "/product", search: "?key=" + post.shoe_ID }} style={{textDecoration: 'none', color: "#fffdd0"}}>
                            <ExitToAppSharp/>
                        </Link>
                    </Card.Text>
                </Card.ImgOverlay>
                <Card.Img variant="top" style={{ height: "60vh", objectFit: "cover" }} src={post.image}/>
                <Card.Body style={{ zIndex: "2", height: "15vh" }}>
                    <div>
                        <Card.Title className='h3'>{post.caption}</Card.Title>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default PostItems;