import {Offcanvas} from "react-bootstrap"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Button, Image} from "react-bootstrap"
import Check from '@material-ui/icons/Check';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';

const BrandPage = ({brand, brands, show, handleClose}) => {
    const followBrand = (event) => {
        // let temp = {}
        // temp[event.target.name]=true;
        fetch("http://localhost:3001/brands/"+brand.id, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "followed": true,
                "name": brand.name,
                "Followers": brand.Followers,
                "Posts": brand.Posts,
                "logo": brand.logo
              }
        )});
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
                    <Button variant="outline-success" name={brand.name} onClick={followBrand}>
                        Follow
                    </Button>
                    <Button variant="success">
                        Followed <Check/>
                    </Button>
                    
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