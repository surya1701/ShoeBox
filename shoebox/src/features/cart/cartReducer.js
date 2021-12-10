import * as actionTypes from "./cartActionTypes";
import Data from "./../../assets/Data.json"

const initialState = {
    ShoesData: Data, // {id, name, brand, image url, price}
    cart:[],
}


const CartReducer = (state = initialState, action)=>{
    switch(action.type) {
        case actionTypes.ADD_TO_CART: 
        const item = state.ShoesData.find((shoe)=>shoe.key === action.payload.id);
        const inCart = state.cart.find((item)=>item.key === action.payload.id ? true: false);
        return {
            ...state,
            cart: inCart ? 
            state.cart.map((item)=> item.key === action.payload.id ? {...item, qty: item.qty +1}: item ):
            [...state.cart,{...item, qty: 1}],
        }

        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item)=>item.key !== action.payload.id)
            }
        case actionTypes.REDUCE_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((item)=>item.key === action.payload.id ? {...item, qty: item.qty-1}: item )
            }
        default: return state
    }
}

export default CartReducer;