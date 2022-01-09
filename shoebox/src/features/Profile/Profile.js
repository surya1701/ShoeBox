import { useState } from 'react';
import { connect } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Brand from '../home/Brand';
import Header from "../../components/Header";
import ItemDisplay from '../../components/ItemDisplay';
import './style.css';
import styled from 'styled-components'
import { Link, Navigate } from 'react-router-dom';

const Profile = ({user, ShoesData}) => {
    const [brands, setBrands] = useState(null);
    if (! brands)
    fetch("http://localhost:3001/brands")
    .then(res => res.json())
    .then(result => {
        if(result) {
            setBrands(result);
        }})
    return (
        <>
        <Header/>
        {(user) ?
        <div className="row g-0">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title mb-4">
                            <div className="d-flex justify-content-center">
                                <div className="image-container">
                                    <img
                                        src={user.imageUrl}

                                        alt='user-profile'

                                        style={{
                                            width: 150,
                                            height: 150,
                                            objectFit: 'cover',
                                        }}
                                        className="img-thumbnail"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row g-0">
                            <div className="col-12 p-1">
                                <Tabs defaultActiveKey="info" id="uncontrolled-tab-example">
                                    <Tab eventKey="info" title="Info">
                                        <div className="mt-4">
                                            <div className="row">
                                                <div className="col-sm-3 col-md-2 col-5">
                                                    <label className="item-label">Full Name</label>
                                                </div>
                                                <div className="col-md-8 col-6">{user.name}</div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3 col-md-2 col-5">
                                                    <label className="item-label">Email</label>
                                                </div>
                                                <div className="col-md-8 col-6">{user.email}</div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3 col-md-2 col-5">
                                                    <label className="item-label">User Since</label>
                                                </div>
                                                <div className="col-md-8 col-6">{user.since}</div>
                                            </div>
                                            <hr/>
                                            
                                        </div>
                                    </Tab>
                                    <Tab eventKey="additional" title="Followed">
                                        <WrapContainer>
                                        {/* <h4 className='display-6'>Followed Brands</h4> */}
                                        {(brands && user) ? brands.filter((b) => user.followed.includes(b.name)).map((b) => <Brand key={b.id} brand={b} brands={brands}/>):<p>Empty</p>}
                                        </WrapContainer>
                                    </Tab>
                                    <Tab eventKey="likedShoes" title="Liked">
                                        <Container>
                                        <Content>
                                        {(user) ? ShoesData.filter((item) => user.liked.includes(item.id)).map((item) => <ItemDisplay key={item.id} item={{...item}}/>):<p>No Liked Shoes</p>}
                                        </Content>
                                        </Container>
                                    </Tab>
                                    <Tab eventKey="orders" title="Orders">
                                        {(user) ? user.orders.map((o) => {
                                            return o.cart.map((item)=><p><h6>{o.date}</h6> <h4><Link to={{ pathname: "/product", search: "?key=" + item.id }}>{item.name}: Size {item.size} x{item.qty}</Link></h4></p>)
                                        }):<p></p>}
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> : <Navigate to="/"/>}
        </>
    );
};
const mapStateToProps=(state)=>{
    return {
        user: state.auth.googleUser,
        ShoesData: state.cart.ShoesData
    }
}
export default connect(mapStateToProps)(Profile);
const WrapContainer = styled.div`
    margin-top: 20px;
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
`
const Container = styled.div`
margin-top: 20px;
margin-bottom: 30px;
`

const Content = styled.div`
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0,1fr));
`