import * as actionTypes from "./cartActionTypes";
/* Cart Actions to change the state of cart */

export const addToCart = (itemId) => { // action to add item to cart and change state of cart
    return {
        type: actionTypes.ADD_TO_CART,
        payload: {
            id: itemId
        }
    }
}
export const removeFromCart = (itemId) => { // action to remove item from cart and change state of cart
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: {
            id: itemId
        }
    }
}
export const reduceQuantity = (itemId, value) => { // action to reduce quantity and change state of cart
    return {
        type: actionTypes.REDUCE_QUANTITY,
        payload: {
            id: itemId,
            qty: value
        }
    }
}
export const orderConfirmed = (itemId, value) => {  // action to confrim order and change state of cart
    return {
        type: actionTypes.ORDER_CONFIRMED,
    }
}