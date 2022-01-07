import { Navigate, useParams } from "react-router-dom";
import { store } from "../../app/store";

function ExploreByName({brands}) {
    const {value} = useParams();
    
    if (value === "Men" || value === "Women")
    store.dispatch({type:'SINGLE_GENDER', payload:{gender: value}});
    else if (value === "Sneakers" || value === "Sports" || value === "Casual")
    store.dispatch({type:'SINGLE_TYPE', payload:{type: value}});
    else if (brands.includes(value))
    store.dispatch({type:'SINGLE_BRAND', payload:{brand: value}});
    return (<Navigate to="/explore"/>)
}
export default ExploreByName;