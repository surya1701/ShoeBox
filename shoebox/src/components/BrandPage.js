import { useState } from "react";
import {Offcanvas} from "react-bootstrap"
import { store } from "../app/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Button, Image} from "react-bootstrap"
import Check from '@material-ui/icons/Check';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';

const BrandPage = ({brand, brands, show, handleClose, user}) => {
    const [follow, setFollow] = useState(false);

    if(!follow && user !== null)
    fetch("http://localhost:3001/users/"+user.givenName)
    .then(res => res.json())
    .then(result => {
        if(result) {
            setFollow(result.followed.includes(brand.name));
        }})
    const followBrand = (event, type) => {
        if (type === "add") {
            fetch("http://localhost:3001/users/"+user.givenName, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    ...user,
                    "followed": [...user.followed, brand.name]
                }
            )});
            store.dispatch({type:'GOOGLE_AUTH_SUCCESS', payload: {user: {...user, followed: [...user.followed, brand.name]}}});
            setFollow(true);
        } else {
            fetch("http://localhost:3001/users/"+user.givenName, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        ...user,
                        "followed": user.followed.filter((i) => i !== brand.name)
                    }
                    )});
            store.dispatch({type:'GOOGLE_AUTH_SUCCESS', payload: {user: {...user, followed: user.followed.filter((i) => i !== brand.name)}}});
            setFollow(false);
        }
    }
    
    return (
        <Offcanvas show={show} onHide={handleClose} placement='end' className='text-center'>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>{brand.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <Image fluid rounded src={brands.filter((b) => b.name === brand.name)[0].logo}/>
            <br/>
            <div className="row g-0">
                <div className="col-6">
                    <h5 className='display-6'>{brand.Posts}</h5>
                    <h6>Posts</h6>
                </div>
                <div className="col-6">
                    <h5 className='display-6'>{brand.Followers}</h5>
                    <h6>Followers</h6>
                </div>
            </div>
            <br/>
            <div className='p-1'>
                <div className="d-grid gap-2 mb-3">
                    {(user) ? (follow) ?
                    <Button variant="success" onClick={(e) => followBrand(e, "del")}>
                        Followed <Check/>
                    </Button> :
                    <Button variant="outline-success"  onClick={(e) => followBrand(e, "add")}>
                        Follow
                    </Button> : <p></p>
                    }
                    <Button variant="primary" href={"/brand/"+brand.name}>
                        Explore Products <ArrowRightAlt/>
                    </Button>
                </div>
            </div>
            </Offcanvas.Body>
        </Offcanvas>    
    )
}
export default BrandPage;