import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import CartView from "./cartView";
import Coupon from "./Coupon";
import { store } from "../../app/store";

/* Cart component */
const Cart = ({ cartValue, discounted, user }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [oldPrice, setOldPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    // function to apply coupouns
    const handleCoupon = (data) => {
        fetch("http://localhost:3001/coupons")
            .then(res => res.json())
            .then(result => {
                if (result) {
                    if (Object.keys(result).includes(data.coupon)) {
                        if (discounted === null) store.dispatch({ type: 'DISCOUNT', payload: { price: totalPrice, discount: result[data.coupon] } });
                        else {
                            store.dispatch({ type: 'DISCOUNT', payload: { price: totalPrice, discount: 0 } });
                            store.dispatch({ type: 'DISCOUNT', payload: { price: oldPrice, discount: result[data.coupon] } });
                        }
                    } else {
                        store.dispatch({ type: 'DISCOUNT', payload: { price: totalPrice, discount: 0 } });
                    }
                }
            })
    };
    /* Coupon Field to render coupon component and call functions to deal with coupon */
    const CouponField = () => {
        return (<Coupon
            handleCoupon={handleCoupon}
            user={user}
        />)
    };

    useEffect(() => {
        let items = 0;
        let price = 0;
        cartValue.forEach(item => {
            items += item.qty;
            price += item.qty * item.price;
        });
        if (discounted) {
            setOldPrice(price);
            setTotalPrice(discounted);
        } else setTotalPrice(price);
        setTotalItems(items);
    }, [cartValue, discounted, totalPrice, totalItems])

    return (
        <div>
            <Header />
            <div >
                <div className="text-center mt-5">
                    <h1>Cart</h1>
                    <p><i>"Life is too short to wear boring shoes"</i></p>
                </div>
                <div className="row g-0 justify-content-center">
                    <div className="col-sm-9 p-3">
                        {
                            totalItems > 0 ?
                                <div className={"container"}>
                                    <div className="card card-body border-0">
                                        {cartValue.map(product => <CartView key={product.id} product={product} />)}
                                    </div>
                                </div>
                                :
                                <div className="p-3 text-center text-muted">
                                    Your cart is empty<br />
                                    <Link to="/"><button type="button" className="btn btn-primary mb-2">Back Home</button></Link>
                                </div>
                        }
                    </div>
                    {
                        totalItems > 0 &&
                        <div className="col-sm-3 p-3">
                            <div className="card card-body">
                                <p className="mb-1">Total Items</p>
                                <h4 className=" mb-3">{totalItems}</h4>
                                <p className="mb-1">Total Payment</p>
                                <CouponField />
                                <h3 className="m-0">
                                    &#8377;
                                    {(discounted) ?
                                        <del style={{ color: "red" }}>{oldPrice}</del> : <del></del>}
                                    &nbsp;{totalPrice}
                                </h3>
                                <hr className="my-4" />
                                <div className="text-center">
                                    {(user) ?
                                        <Link to="/checkout"><button type="button" className="btn btn-primary mb-2">CHECKOUT</button></Link>
                                        : <p>Login To Checkout</p>}
                                </div>

                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cartValue: state.cart.cart,
        discounted: state.cart.discounted,
        user: state.auth.googleUser
    }
}
export default connect(mapStateToProps)(Cart);