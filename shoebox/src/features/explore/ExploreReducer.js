import * as actionTypes from "./exploreActionTypes"
import Data from "./../../assets/Data.json"
import { store } from "../../app/store"

const initialState = {
    brands: Data.map((item) => item.brand),
    text: "",
    ShoesData: Data,
    items: Data // {id, name, brand, image url, price}
}


const ExploreReducer = (state = initialState, action)=>{
    switch(action.type) {
        case actionTypes.ADD_BY_BRAND:
            var temp = [...state.brands, action.payload.brand]
            return {...state, brands: temp, items: state.ShoesData.filter((item) => temp.includes(item.brand) && item.name.toLowerCase().startsWith(state.text.toLowerCase()))}
        case actionTypes.REMOVE_BY_BRAND:
            var temp = state.brands.filter((b) => b !== action.payload.brand);
            return {...state, brands: temp, items: state.ShoesData.filter((item) => temp.includes(item.brand) && item.name.toLowerCase().startsWith(state.text.toLowerCase()))}
        case actionTypes.SEARCH:
            if (action.payload.text.length < state.text.length) {
                var temp = [...state.brands, action.payload.brand]
                var oldList = state.ShoesData.filter((item) => temp.includes(item.brand));
                console.log(temp);
                return {...state, text:action.payload.text, items: oldList.filter((item) => item.name.toLowerCase().startsWith(action.payload.text.toLowerCase()))}
            } else {
                return {...state, text:action.payload.text, items: state.items.filter((item) => item.name.toLowerCase().startsWith(action.payload.text.toLowerCase()))}
            }
        case actionTypes.CLEAR_ALL:
            return {...initialState}
        default: return state
    }
}

export default ExploreReducer;