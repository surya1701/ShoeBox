import * as actionTypes from "./exploreActionTypes"
// import Data from "./../../assets/Data.json"

const initialState = {
    brands: [],
    genders: [],
    types: [],
    text: "",
    ShoesData: [],
    sortBy: "viewsDESC",
    items: [] // {id, name, brand, image url, price}
}


const ExploreReducer = (state = initialState, action)=>{
    const sort = (items, by) => {
        if (by === "priceASC") items.sort((a,b) => (parseInt(a.price) > parseInt(b.price)) ? 1 : ((parseInt(b.price) > parseInt(a.price)) ? -1 : 0));
        else if (by === "priceDESC") items.sort((a,b) => (parseInt(a.price) < parseInt(b.price)) ? 1 : ((parseInt(b.price) < parseInt(a.price)) ? -1 : 0));
        else if (by === "viewsASC") items.sort((a,b) => (parseInt(a.views) > parseInt(b.views)) ? 1 : ((b.views > a.views) ? -1 : 0));
        else if (by === "viewsDESC") items.sort((a,b) => (parseInt(a.views) < parseInt(b.views)) ? 1 : ((parseInt(b.views) < parseInt(a.views)) ? -1 : 0));
        return items;
    }
    var temp = null;
    switch(action.type) {
        case actionTypes.LOAD_DATA:
            return {...state,
                ShoesData: sort(action.payload.shoes, state.sortBy),
                items: sort(action.payload.shoes, state.sortBy),
                brands: action.payload.shoes.map((item) => item.brand),
                genders: action.payload.shoes.map((item) => item.gender),
                types: action.payload.shoes.map((item) => item.type),
            }
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
        case actionTypes.SINGLE_GENDER:
            return {...state, genders: [action.payload.gender], items: sort(state.ShoesData.filter((item) => item.gender === action.payload.gender), state.sortBy)}
        case actionTypes.ADD_BY_TYPE:
            temp = [...state.types, action.payload.type]
            return {...state, types: temp, items: sort(state.ShoesData.filter((item) => temp.includes(item.type) && item.name.toLowerCase().startsWith(state.text.toLowerCase())), state.sortBy)}
        case actionTypes.REMOVE_BY_TYPE:
            temp = state.types.filter((b) => b !== action.payload.type);
            return {...state, types: temp, items: sort(state.ShoesData.filter((item) => temp.includes(item.type) && item.name.toLowerCase().startsWith(state.text.toLowerCase())), state.sortBy)}
        case actionTypes.SEARCH:
            if (action.payload.text.length < state.text.length || state.text.length === 1) {
                temp = [...state.brands, action.payload.brand]
                var oldList = state.ShoesData.filter((item) => temp.includes(item.brand));
                console.log(temp);
                return {...state, text:action.payload.text, items: sort(oldList.filter((item) => item.name.toLowerCase().startsWith(action.payload.text.toLowerCase())), state.sortBy)}
            } else {
                return {...state, text:action.payload.text, items: sort(state.items.filter((item) => item.name.toLowerCase().startsWith(action.payload.text.toLowerCase())), state.sortBy)}
            }
        case actionTypes.CLEAR_ALL:
            return {...initialState, sortBy: state.sortBy}
        case actionTypes.SORT:
            return {...state, sortBy: action.payload.by, items: sort([...state.items], action.payload.by)}
        case actionTypes.INCREMENT_VIEWS:
            return {...state,
                ShoesData: state.ShoesData.map((i) => (i.id === action.payload.key)? {...i, views: i.views+1}: i),
                items: state.items.map((i) => (i.id === action.payload.key)? {...i, views: i.views+1}: i)}
        default: return state
    }
}

export default ExploreReducer;