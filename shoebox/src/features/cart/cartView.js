import React from 'react';
import { store } from '../../app/store';
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from './../../assets/icons';

const CartView = ({product}) => {

    const addToCart=(keyValue, size)=>{
        store.dispatch({type:'ADD_TO_CART', payload:{id: keyValue, size:size}});
    }
    const reduceQuantity=(keyValue, size)=>{
        store.dispatch({type:'REDUCE_QUANTITY', payload:{id: keyValue, size:size}});
    }
    const removeFromCart=(keyValue, size)=>{
        store.dispatch({type:'REMOVE_FROM_CART', payload:{id: keyValue, size:size}});
    }
    return (
        <div className="row no-gutters py-2">
            <div className="col-sm-2 p-2">
                <img
                alt={product.name}
                style={{margin: "0 auto", maxHeight: "200px"}} 
                src={product.image[0]} className="img-fluid d-block"/>
            </div>
            <div className="col-sm-4 p-2">
                <h5 className="mb-1">{product.name}</h5>
                <h6 className="mb-1">{product.brand}</h6>
                <p className="mb-1">Price: &#8377; {product.price} </p>
                
            </div>
            <div className="col-sm-2 p-2 text-center ">
                 <p className="mb-0">Qty: {product.qty}</p>
                 <p className="mb-0">Size: {product.size}</p>
            </div>
            <div className="col-sm-4 p-2 text-right">
                 <button 
                 onClick={() => addToCart(product.id, product.size)}
                 className="btn btn-primary btn-sm mr-2 mb-1">
                     <PlusCircleIcon width={"20px"}/>
                 </button>

                 {
                     product.qty > 1 &&
                     <button
                    onClick={() => reduceQuantity(product.id, product.size)}
                    className="btn btn-danger btn-sm mb-1">
                        <MinusCircleIcon width={"20px"}/>
                    </button>
                 }

                <button
                    onClick={() => removeFromCart(product.id, product.size)}
                    className="btn btn-danger btn-sm mb-1">
                        <TrashIcon width={"20px"}/>
                </button>
            </div>
        </div>
     );
}

export default CartView;