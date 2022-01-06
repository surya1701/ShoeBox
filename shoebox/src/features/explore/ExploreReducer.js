import * as actionTypes from "./exploreActionTypes"
import Data from "./../../assets/Data.json"

const initialState = {
    brands: Data.map((item) => item.brand),
    genders: Data.map((item) => item.gender),
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
    var temp = null;
    switch(action.type) {
        case actionTypes.ADD_BY_BRAND:
            temp = [...state.brands, action.payload.brand]
            return {...state, brands: temp, items: sort(state.ShoesData.filter((item) => temp.includes(item.brand) && item.name.toLowerCase().startsWith(state.text.toLowerCase())), state.sortBy)}
        case actionTypes.REMOVE_BY_BRAND:
            temp = state.brands.filter((b) => b !== action.payload.brand);
            return {...state, brands: temp, items: sort(state.ShoesData.filter((item) => temp.includes(item.brand) && item.name.toLowerCase().startsWith(state.text.toLowerCase())), state.sortBy)}
            case actionTypes.ADD_BY_GENDER:
                temp = [...state.genders, action.payload.gender]
                return {...state, genders: temp, items: sort(state.ShoesData.filter((item) => temp.includes(item.gender) && item.name.toLowerCase().startsWith(state.text.toLowerCase())), state.sortBy)}
            case actionTypes.REMOVE_BY_GENDER:
                temp = state.genders.filter((b) => b !== action.payload.gender);
                return {...state, genders: temp, items: sort(state.ShoesData.filter((item) => temp.includes(item.gender) && item.name.toLowerCase().startsWith(state.text.toLowerCase())), state.sortBy)}
        case actionTypes.SEARCH:
            if (action.payload.text.length < state.text.length) {
                temp = [...state.brands, action.payload.brand]
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