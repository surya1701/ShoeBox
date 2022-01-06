import {Offcanvas, Button} from "react-bootstrap"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Checkbox, FormLabel, FormControlLabel, TextField } from "@material-ui/core";

const ExploreFilter = ({show, handleClose, filtering, brands, filterBrands, filterGenders, filterTypes}) => {
    var mapper = {}
    mapper["Men"] = false;
    mapper["Women"] = false;
    brands.forEach((b) => mapper[b] = false);
    filterBrands.map((v) => mapper[v] = true)
    filterGenders.map((v) => mapper[v] = true)
    filterTypes.map((v) => mapper[v] = true)
    const handleChange = (event) => {
        if (event.target.type === "checkbox") {
            if (event.target.checked) {
                filtering.filter_add(event.target.id, event.target.value);
            } else {
                filtering.filter_del(event.target.id, event.target.value);
            }
        }
        else if (event.target.type === "text") {
            if (event.target.value.length > 0) filtering.filter_search(event.target.value);
        }
    }
    const handleClear = (event) => {
        document.getElementById("search").value="";
        filtering.filter_clear();
        handleClose();
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
                <FormControlLabel key={brand.id} control={<Checkbox checked={mapper[brand.name]} value={brand.name} id={"brand"}/>} label={brand.name} onChange={handleChange}/>
            )}
            <br/>
            <FormLabel component="legend">Type</FormLabel>
            {["Sneakers", "Sports", "Casual"].map((type) =>
                <FormControlLabel key={type} control={<Checkbox checked={mapper[type]} value={type} id={"type"}/>} label={type} onChange={handleChange}/>
            )}
            <br/>
            <FormLabel component="legend">Gender</FormLabel>
            <FormControlLabel control={<Checkbox checked={mapper["Men"]} value={"Men"} id={"gender"}/>} label={"Men"} onChange={handleChange}/>
            <FormControlLabel control={<Checkbox checked={mapper["Women"]} value={"Women"} id={"gender"}/>} label={"Women"} onChange={handleChange}/>
            <br/><br/>
            <Button variant="danger" onClick={handleClear}>Clear All</Button>
            </Offcanvas.Body>
        </Offcanvas>    
    )
}
export default ExploreFilter;