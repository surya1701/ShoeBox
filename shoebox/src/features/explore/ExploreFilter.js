import {Offcanvas, Button} from "react-bootstrap"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Checkbox, FormLabel, FormControlLabel, TextField } from "@material-ui/core";

const ExploreFilter = ({show, handleClose, filtering, brands, filterBrands}) => {
    var mapper = {"Adidas": false, "Nike": false, "Puma": false, "Reebok": false, "Under Armour": false};
    filterBrands.map((v) => mapper[v] = true)
    const handleChange = (event) => {
        if (event.target.type === "checkbox") {
            if (event.target.checked) {
                filtering.filter_add("brand", event.target.value);
            } else {
                filtering.filter_del("brand", event.target.value);
            }
        }
        else if (event.target.type === "text") {
            if (event.target.value.length > 0) filtering.filter_search(event.target.value);
        }
    }
    const handleClear = (event) => {
        document.getElementById("search").value="";
        filtering.filter_clear();
    }
    return (
        <Offcanvas show={show} onHide={handleClose} placement='end' className='text-center'>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filter</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <FormControlLabel control={<TextField label="Search" id="search"/>} onChange={handleChange}/>
            <br/><br/>
            <FormLabel component="legend">Brand</FormLabel>
            {brands.map((brand) =>
                <FormControlLabel control={<Checkbox checked={mapper[brand.name]} value={brand.name} id={brand.name}/>} label={brand.name} onChange={handleChange}/>
                )}
            <br/><br/>
            <Button variant="danger" onClick={handleClear}>Clear All</Button>
            </Offcanvas.Body>
        </Offcanvas>    
    )
}
export default ExploreFilter;