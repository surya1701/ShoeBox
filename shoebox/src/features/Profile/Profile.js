import { useState } from 'react';
import { connect } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Brand from '../home/Brand';
import Header from "../../components/Header";
import './style.css';
import styled from 'styled-components'
import { Navigate } from 'react-router-dom';

const Profile = ({user}) => {
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
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title mb-4">
                            <div className="d-flex justify-content-start">
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
                                <div className="userData ml-3">
                                    <h2>{user.name}</h2>
                                    <h6>{user.email}</h6>
                                    <h6>Customer info</h6>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <Tabs defaultActiveKey="info" id="uncontrolled-tab-example">
                                    <Tab eventKey="info" title="Basic info">
                                        <div className="mt-4">
                                            <div className="row">
                                                <div className="col-sm-3 col-md-2 col-5">
                                                    <label className="item-label">Full Name</label>
                                                </div>
                                                <div className="col-md-8 col-6">Lorem Ipsum</div>
                                            </div>
                                            <hr />

                                            <div className="row">
                                                <div className="col-sm-3 col-md-2 col-5">
                                                    <label className="item-label">Birth Date</label>
                                                </div>
                                                <div className="col-md-8 col-6">March 22, 1983.</div>
                                            </div>
                                            <hr />

                                            <div className="row">
                                                <div className="col-sm-3 col-md-2 col-5">
                                                    <label className="item-label">Lorem Ipsum</label>
                                                </div>
                                                <div className="col-md-8 col-6">Lorem Ipsum</div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3 col-md-2 col-5">
                                                    <label className="item-label">Lorem Ipsum</label>
                                                </div>
                                                <div className="col-md-8 col-6">Lorem Ipsum</div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3 col-md-2 col-5">
                                                    <label className="item-label">Lorem Ipsum</label>
                                                </div>
                                                <div className="col-md-8 col-6">Lorem Ipsum</div>
                                            </div>
                                            <hr />
                                        </div>
                                    </Tab>
                                    <Tab eventKey="additional" title="Additional info">
                                        <WrapContainer>
                                        <h4 className='display-6'>Followed Brands</h4>
                                        {(brands) ? brands.filter((b) => user.followed.includes(b.name)).map((b) => <Brand brand={b} brands={brands}/>):<p>Empty</p>}
                                        </WrapContainer>
                                        <div className="mt-4">
                                            Dolorem ipsa ea voluptatem. Qui voluptatem totam velit rem
                                            dolores. Esse delectus eius quidem et eveniet.Dolorem ipsa
                                            ea voluptatem. Qui voluptatem totam velit rem dolores.
                                            Esse delectus eius quidem et eveniet.
                                        </div>
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
        user: state.auth.googleUser
    }
}
export default connect(mapStateToProps)(Profile);
const WrapContainer = styled.div`
    margin-top: 30px;
    display: grid;
    padding: 30px 0 26px;
    grid-gap: 25px;
    grid-template-columns: repeat(5, minmax(0, 1fr));
`