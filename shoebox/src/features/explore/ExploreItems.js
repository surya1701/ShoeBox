import { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Card, Image } from 'react-bootstrap'
import { Link } from "react-router-dom"
import BrandPage from '../../components/BrandPage';
import { store } from "../../app/store";
import "../../App.css"
function ExploreItems({ item, brands, user }) {
    const [show, setShow] = useState(false);
    const [like, setLike] = useState(false);
    if (!like && user !== null)
        fetch("http://localhost:3001/users/" + user.email)
            .then(res => res.json())
            .then(result => {
                if (result) {
                    setLike(result.liked.includes(item.id));
                }
            })
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLike = (event) => {
        if (event.target.checked) {
            fetch("http://localhost:3001/users/" + user.email, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        ...user,
                        "liked": [...user.liked, item.id]
                    }
                )
            });
            store.dispatch({ type: 'GOOGLE_AUTH_SUCCESS', payload: { user: { ...user, liked: [...user.liked, item.id] } } });
            setLike(true);
        } else {
            fetch("http://localhost:3001/users/" + user.email, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        ...user,
                        "liked": user.liked.filter((i) => i !== item.id)
                    }
                )
            });
            store.dispatch({ type: 'GOOGLE_AUTH_SUCCESS', payload: { user: { ...user, liked: user.liked.filter((i) => i !== item.id) } } });
            setLike(false);
        }
    }
    const brand = brands.find((brand) => brand.name === item.brand);

    return (
        <>
            <BrandPage brand={brand} brands={brands} show={show} handleClose={handleClose} user={user} />
            <Card bg="light" border="primary" className='mb-5'>
                <Card.ImgOverlay>
                    <Image fluid rounded style={{ height: "3em", float: "left" }}
                        src={brand.logo}
                        onClick={handleShow} role={"button"} />
                    {(user) ?
                        <FormControlLabel control={<Checkbox checked={like} onClick={handleLike} icon={<FavoriteBorder />}
                            checkedIcon={<Favorite />} name="checkedH" />} style={{ float: "right" }} />
                        : <p></p>}
                </Card.ImgOverlay>
                <Card.Img variant="top" style={{ height: "60vh", objectFit: "contain" }} src={item.image[0]} />
                <Card.Body style={{ zIndex: "2", height: "25vh" }}>
                    <div>
                        <Card.Title className='display-6'>
                            <Link to={{ pathname: "/product", search: "?key=" + item.id }}
                                className="pbtn"
                                style={{ fontSize: "28px", fontWeight: '300', fontFamily: 'sans-serif', textDecoration: 'none', padding: '5px', borderRadius: '5px' }}>
                                {item.name}
                            </Link>
                        </Card.Title>
                    </div>
                    <div>
                        <Card.Text style={{ float: "right" }}>&#8377; {item.price}</Card.Text>
                        <Card.Text style={{ display: "inline" }}>{item.date}</Card.Text>
                        <Card.Text style={{ float: "left" }}>{item.views} Views</Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default ExploreItems;