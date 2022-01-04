import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Card, Image } from 'react-bootstrap'
import { Link } from "react-router-dom"

function ExploreItems({ currentItems, brands }) {
    return (
        <>
            {currentItems &&
                currentItems.map((item) => (
                    <Card border="primary" className='mb-5'>
                        <Card.ImgOverlay>
                            <Image fluid rounded style={{ height: "3em", float: "left" }}
                                src={brands.filter((brand) => brand.label === item.brand)[0].img} />
                            <FormControlLabel control={<Checkbox icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />} name="checkedH" />} style={{ float: "right" }} />
                        </Card.ImgOverlay>
                        <Card.Img variant="top" style={{ height: "50vh", 'object-fit': "cover" }} src={item.image[0]} />
                        <Card.Body style={{ zIndex: "2" }}>
                            <Card.Title className='display-6' style={{ display: "inline" }}>
                                <Link to={{ pathname: "/product", search: "?key="+item.key }}>{item.name}</Link>
                            </Card.Title>
                            <Card.Text style={{ float: "right" }}>&#8377; {item.price}</Card.Text>
                            <Card.Text style={{ float: "left" }}>View count</Card.Text>
                        </Card.Body>
                    </Card>))}
        </>
    );
}

export default ExploreItems;