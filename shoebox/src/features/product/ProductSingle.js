import React from 'react';
import './product.css';
import Colors from './Color'
import DetailsThumb from './DetailsThumb';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NewArrival from '../home/NewArrival';

class ProductSingle extends React.Component {

    state = {
        products: [
            {
                "_id": "1",
                "title": "Nike Shoes",
                "src": [
                    "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/ab191ef9-2b59-4351-8564-7308ab976f1f/pegasus-trail-3-gore-tex-waterproof-trail-running-shoes-ZKmC2v.png",
                    "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/ab191ef9-2b59-4351-8564-7308ab976f1f/pegasus-trail-3-gore-tex-waterproof-trail-running-shoes-ZKmC2v.png",
                    "https://media.istockphoto.com/photos/adidas-superstar-picture-id458068097?k=20&m=458068097&s=612x612&w=0&h=57J_lM_EMo1ddJZsWlbWgJMy5Nr9XlLMqRA4MpbRMX4=",
                    "https://images.vans.com/is/image/Vans/EYEBWW-HERO"
                ],
                "description": "Go with the flow on these shoes",
                "content": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
                "price": 5999,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1
            }
        ],
        index: 0
    };

    myRef = React.createRef();

    handleTab = index => {
        this.setState({ index: index })
        const images = this.myRef.current.children;
        for (let i = 0; i < images.length; i++) {
            images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
    };

    componentDidMount() {
        const { index } = this.state;
        this.myRef.current.children[index].className = "active";
    }


    render() {
        const { products, index } = this.state;
        return (
            <div className="app">
                {
                    products.map(item => (
                        <div className="details" key={item._id}>
                            <div className="big-img">
                                <img src={item.src[index]} alt="" />
                            </div>

                            <div className="box">
                                <div className="row">
                                    <h2>{item.title}</h2>
                                    <span>${item.price}</span>
                                </div>
                                <Colors colors={item.colors} />

                                <p>{item.description}</p>
                                <p>{item.content}</p>

                                <DetailsThumb images={item.src} tab={this.handleTab} myRef={this.myRef} />
                                <button className="cart">Add to cart</button>
                                <button className="wishlist">WishList</button>
                            </div>
                        </div>

                    ))
                }
            </div>

        );
    };
}

export default ProductSingle;