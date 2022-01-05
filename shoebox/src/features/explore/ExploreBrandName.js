import { Navigate, useParams } from "react-router-dom";
import { store } from "../../app/store";

function ExploreBrandName({brands}) {
    const {brandName} = useParams();
    
    brands.forEach((b) => {if (b.name !== brandName) 
        store.dispatch({type:'DELbyBRAND', payload:{brand: b.name}})});
    return (<Navigate to="/explore"/>)
}
export default ExploreBrandName;