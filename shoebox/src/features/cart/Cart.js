import {connect} from "react-redux";
import {useEffect, useState} from "react";
import Header from "../../components/Header";
import CartView from "./cartView";

const Cart =({cartValue})=>{
    const [totalPrice, setTotalPrice]= useState(0);
    const [totalItems, setTotalItems]= useState(0);
    
    useEffect(()=>{
     let items= 0;
     let price = 0;
     cartValue.forEach(item => {
         items += item.qty;
         price += item.qty * item.price;
     });
     setTotalPrice(price);
     setTotalItems(items);
    },[cartValue,totalPrice,totalItems ])
    return (
        <div>
            <Header/>
            <div >
                <div className="text-center mt-5">
                    <h1>Cart</h1>
                    <p>This is the Cart Page.</p>
                </div>
                <div className="row g-0 justify-content-center">
                    <div className="col-sm-9 p-3">
                        {
                            totalItems > 0 ?
                            <div className={"container"}>
                                <div className="card card-body border-0">
                                    {cartValue.map(product =>  <CartView product={product}/>)}
                                </div>
                            </div>
                                    :
                            <div className="p-3 text-center text-muted">
                                Your cart is empty
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
                                <h3 className="m-0">&#8377; {totalPrice}</h3>
                                <hr className="my-4"/>
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary mb-2">CHECKOUT</button>
                                    <button type="button" className="btn btn-outline-primary btn-sm">CLEAR</button>
                                </div>
                                {/* <div className="text-center">
                                    <button type="button" className="btn btn-primary mb-2" onClick={handleCheckout}>CHECKOUT</button>
                                    <button type="button" className="btn btn-outlineprimary btn-sm" onClick={clearCart}>CLEAR</button>
                                </div> */}

                            </div>
                        </div>
                    } 
                </div>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
        cartValue: state.cart.cart
    }
}
export default connect(mapStateToProps)(Cart);