import * as actionTypes from "./cartActionTypes";
// import Data from "./../../assets/Data.json"

const initialState = {
    ShoesData: [], // {id, name, brand, image url, price}
    cart:[],
}


const CartReducer = (state = initialState, action)=>{
    switch(action.type) {
        case actionTypes.LOAD_DATA:
            return {...state, ShoesData: action.payload.shoes}
        case actionTypes.ADD_TO_CART: 
        const item = state.ShoesData.find((shoe)=>shoe.id === action.payload.id);
        const inCart = state.cart.find((item)=>(item.id === action.payload.id && item.size === action.payload.size)? true: false);
        return {
            ...state,
            cart: inCart ? 
            state.cart.map((item)=> (item.id === action.payload.id && item.size === action.payload.size) ? {...item, qty: item.qty +1}: item ):
            [...state.cart,{...item, qty: 1, size:action.payload.size}],
        }

        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item)=>(item.id !== action.payload.id || item.size !== action.payload.size))
            }
        case actionTypes.REDUCE_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((item)=>(item.id === action.payload.id && item.size === action.payload.size) ? {...item, qty: item.qty-1}: item )
            }
        case actionTypes.ORDER_CONFIRMED:
            return {
                ...state,
                cart: []
            }
        default: return state
    }
}

export default CartReducer;