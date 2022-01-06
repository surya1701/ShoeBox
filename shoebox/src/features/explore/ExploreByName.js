import { Navigate, useParams } from "react-router-dom";
import { store } from "../../app/store";

function ExploreByName({brands}) {
    const {value} = useParams();
    
    if (value === "Men")
    store.dispatch({type:'SINGLE_GENDER', payload:{gender: "Men"}});
    else if (value === "Women")
    store.dispatch({type:'SINGLE_GENDER', payload:{gender: "Women"}});
    else
    brands.forEach((b) => {if (b.name !== value) 
        store.dispatch({type:'DELbyBRAND', payload:{brand: b.name}})});
    return (<Navigate to="/explore"/>)
}
export default ExploreByName;