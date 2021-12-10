import * as actionTypes from "./cartActionTypes";

export const addToCart = (itemId)=>{
    return {
        type: actionTypes.ADD_TO_CART,
        payload: {
            id: itemId
        }
    }
}
export const removeFromCart = (itemId)=>{
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: {
            id: itemId
        }
    }
}
export const reduceQuantity = (itemId, value)=>{
    return {
        type: actionTypes.REDUCE_QUANTITY,
        payload: {
            id: itemId,
            qty: value
        }
    }
}
export const orderConfirmed = (itemId, value)=>{
    return {
        type: actionTypes.ORDER_CONFIRMED,
    }
}