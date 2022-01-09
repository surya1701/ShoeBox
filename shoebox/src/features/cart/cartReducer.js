import * as actionTypes from "./cartActionTypes";
// import Data from "./../../assets/Data.json"

// loading and setting up the initial state of cart
const initialState = {
    ShoesData: [], // {id, name, brand, image url, price}
    cart: [],
    discounted: null
}


// Reducer functions for cart
const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_DATA:
            return { ...state, ShoesData: action.payload.shoes }
        case actionTypes.DISCOUNT:
            if (action.payload.discount === 0)
                return { ...state, discounted: null }
            else
                return { ...state, discounted: parseInt(action.payload.price - (action.payload.discount * action.payload.price / 100)) }
        case actionTypes.ADD_TO_CART:
            const item = state.ShoesData.find((shoe) => shoe.id === action.payload.id);
            const inCart = state.cart.find((item) => (item.id === action.payload.id && item.size === action.payload.size) ? true : false);
            return {
                ...state,
                cart: inCart ?
                    state.cart.map((item) => (item.id === action.payload.id && item.size === action.payload.size) ? { ...item, qty: item.qty + 1 } : item) :
                    [...state.cart, { ...item, qty: 1, size: action.payload.size }],
                discounted: null
            }

        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item) => (item.id !== action.payload.id || item.size !== action.payload.size)),
                discounted: null
            }
        case actionTypes.REDUCE_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((item) => (item.id === action.payload.id && item.size === action.payload.size) ? { ...item, qty: item.qty - 1 } : item),
                discounted: null
            }
        case actionTypes.ORDER_CONFIRMED:
            return {
                ...state,
                cart: [],
                discounted: null
            }
        default: return state
    }
}

export default CartReducer;