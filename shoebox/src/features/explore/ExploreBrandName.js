import { Navigate, useParams } from "react-router-dom";
import { store } from "../../app/store";

const brands = [
    {label: "Adidas", value: "Adidas", img: "https://greepx.com/wp-content/uploads/2020/02/adidas-wallpapers.jpg"},
    {label: "Nike", value: "Nike", img: "https://wallpaperaccess.com/full/135853.jpg"},
    {label: "Puma", value: "Puma", img: "https://logodix.com/logo/487483.png"},
    {label: "Vans", value: "Vans", img: "https://logodix.com/logo/487483.png"},
    {label: "Adidas2", value: "Adidas2", img: "https://greepx.com/wp-content/uploads/2020/02/adidas-wallpapers.jpg"},
];
function ExploreBrandName() {
    const {brandName} = useParams();
    console.log(brandName);
    brands.forEach((b) => {if (b.label !== brandName) 
        store.dispatch({type:'DELbyBRAND', payload:{brand: b.label}})});
    return (<Navigate to="/explore"/>)
}
export default ExploreBrandName;