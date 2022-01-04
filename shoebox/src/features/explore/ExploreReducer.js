import * as actionTypes from "./exploreActionTypes"
import Data from "./../../assets/Data.json"
import { store } from "../../app/store"

const initialState = {
    brands: Data.map((item) => item.brand),
    text: "",
    ShoesData: Data,
    sortBy: "viewsDESC",
    items: Data // {id, name, brand, image url, price}
}


const ExploreReducer = (state = initialState, action)=>{
    const sort = (items, by) => {
        if (by === "priceASC") items.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
        else if (by === "priceDESC") items.sort((a,b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0));
        return items;
    }
    switch(action.type) {
        case actionTypes.ADD_BY_BRAND:
            var temp = [...state.brands, action.payload.brand]
            return {...state, brands: temp, items: sort(state.ShoesData.filter((item) => temp.includes(item.brand) && item.name.toLowerCase().startsWith(state.text.toLowerCase())), state.sortBy)}
        case actionTypes.REMOVE_BY_BRAND:
            var temp = state.brands.filter((b) => b !== action.payload.brand);
            return {...state, brands: temp, items: sort(state.ShoesData.filter((item) => temp.includes(item.brand) && item.name.toLowerCase().startsWith(state.text.toLowerCase())), state.sortBy)}
        case actionTypes.SEARCH:
            if (action.payload.text.length < state.text.length) {
                var temp = [...state.brands, action.payload.brand]
                var oldList = state.ShoesData.filter((item) => temp.includes(item.brand));
                console.log(temp);
                return {...state, text:action.payload.text, items: sort(oldList.filter((item) => item.name.toLowerCase().startsWith(action.payload.text.toLowerCase())), state.sortBy)}
            } else {
                return {...state, text:action.payload.text, items: sort(state.items.filter((item) => item.name.toLowerCase().startsWith(action.payload.text.toLowerCase())), state.sortBy)}
            }
        case actionTypes.CLEAR_ALL:
            return {...initialState}
        case actionTypes.SORT:
            return {...state, sortBy: action.payload.by, items: sort([...state.items], action.payload.by)}
        default: return state
    }
}

export default ExploreReducer;