import { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Link } from "react-router-dom"
import BrandPage from '../../components/BrandPage';
import {Carousel} from "react-bootstrap"
import { store } from "../../app/store";
import styled from "styled-components";
import "../../App.css"

function ExploreItems({ item, brands, user }) {
    const [show, setShow] = useState(false);
    const [like, setLike] = useState(false);
    if (!like && user !== null)
        fetch("http://localhost:3001/users/" + user.googleId)
            .then(res => res.json())
            .then(result => {
                if (result) {
                    setLike(result.liked.includes(item._id));
                }
            })
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLike = (event) => {
        if (event.target.checked) {
            fetch("http://localhost:3001/users/" + user.googleId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        ...user,
                        "liked": [...user.liked, item._id]
                    }
                )
            });
            store.dispatch({ type: 'GOOGLE_AUTH_SUCCESS', payload: { user: { ...user, liked: [...user.liked, item._id] } } });
            setLike(true);
        } else {
            fetch("http://localhost:3001/users/" + user.googleId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        ...user,
                        "liked": user.liked.filter((i) => i !== item._id)
                    }
                )
            });
            store.dispatch({ type: 'GOOGLE_AUTH_SUCCESS', payload: { user: { ...user, liked: user.liked.filter((i) => i !== item._id) } } });
            setLike(false);
        }
    }
    const brand = brands.find((brand) => brand.name === item.brand);

    return (
        <>
            <BrandPage brand={brand} brands={brands} show={show} handleClose={handleClose} user={user} />
            <CardDIV>
            <section className="cards">
                <article className="card card--1">
                <div className="card__img"></div>
                    <div className="card__img--hover">
                        <Carousel variant="dark" style={{overflow: "hidden"}} controls={false} indicators={false} fade={true}>
                            {item.image.map((url) =>
                            <Carousel.Item key={url}>
                                <img alt='' src={url} style={{ height: "60vh", objectFit: "contain" }}  />
                            </Carousel.Item>
                            )}
                        </Carousel>
                    </div>
                <div className="card__info card__info-hover">
                    <span className="card__category" onClick={handleShow} style={{"cursor":"pointer"}}>{item.brand}</span>
                    <div>
                    <Link to={{ pathname: "/product", search: "?key=" + item._id }} style={{textDecoration: 'none'}}>
                        <h3 className="card__title">{item.name}</h3>
                    </Link>
                    </div>
                    <h5>&#8377; {item.price}</h5>
                    <span className="card__by"><p className="card__author" title="author">{item.views} views</p></span>
                    {(user) ?
                    <FormControlLabel control={<Checkbox checked={like} onClick={handleLike} icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />} name="checkedH" />}/>
                    : <p></p>}
                </div>
                </article>
            </section>
            </CardDIV>
        </>
    );
}

export default ExploreItems;

const CardDIV = styled.div`
width: 18rem;
.cards {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    overflow: hidden;
}

.card__img {
    width: 17rem;
    visibility: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.card__info-hover {
  width: 100%;
  opacity: 0;
}

.card__img--hover {
  transition: 0.2s all ease-out;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
}
.card {
  margin: 10px;
  transition: all .4s cubic-bezier(0.175, 0.885, 0, 1);
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0px 13px 10px -7px rgba(0, 0, 0,0.1);
  height: 50vh;
}
.card:hover {
  box-shadow: 0px 30px 18px -8px rgba(0, 0, 0,0.1);
    transform: scale(1.10, 1.10);
}

.card__info {
    z-index: 2;
    background-color: #fff;
   padding: 16px 24px 24px 24px;
}

.card__category {
    font-family: 'Raleway', sans-serif;
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 2px;
    font-weight: 500;
    color: #868686;
}

.card__title {
    margin-top: 5px;
    margin-bottom: 10px;
    font-family: 'Roboto Slab', serif;
}

.card__by {
    font-size: 12px;
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
}

.card__author {
    font-weight: 600;
    text-decoration: none;
    color: #AD7D52;
}

.card:hover .card__img--hover {
    height: 100%;
    opacity: 0.3;
}

.card:hover .card__info {
    background-color: transparent;
    position: relative;
}

.card:hover .card__info-hover {
    opacity: 1;
}
`