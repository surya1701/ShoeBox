import { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { store } from '../../app/store';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ExploreItems from "./ExploreItems";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import ArrowDownwardOutlined from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowUpwardOutlined from '@material-ui/icons/ArrowUpwardOutlined';
import { Button } from "react-bootstrap"
import ExploreFilter from './ExploreFilter';
import ReactPaginate from 'react-paginate';

function Explore({ user, shoesValue, items, filtersortBy, filterBrands, filterGenders, filterTypes, brands }) {
    const itemsPerPage = 16;
    const [sortBy, setSortBy] = useState(filtersortBy);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [items, itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    const filtering = {

        filter_add: (form, value) => {
            if (form === "brand") store.dispatch({type:'ADDbyBRAND', payload:{brand: value}});
            else if (form === "gender") store.dispatch({type:'ADDbyGENDER', payload:{gender: value}});
            else if (form === "type") store.dispatch({type:'ADDbyTYPE', payload:{type: value}});
        },
        filter_del: (form, value) => {
            if (form === "brand") store.dispatch({type:'DELbyBRAND', payload:{brand: value}});
            else if (form === "gender") store.dispatch({type:'DELbyGENDER', payload:{gender: value}});
            else if (form === "type") store.dispatch({type:'DELbyTYPE', payload:{type: value}});
        },
        filter_search: (text) => {
            store.dispatch({ type: 'search', payload: { text: text } });
        },
        filter_clear: () => {
            store.dispatch({ type: 'clearAll' });
            fetch("http://localhost:3001/shoes")
            .then(res => res.json())
            .then(result => {
              if(result) {
              store.dispatch({type:'LOAD_DATA', payload: {shoes: [...result]}});
              store.dispatch({type:'LOAD_DATA_EXPLORE', payload: {shoes: [...result]}})
            }})
        }
    }
    const sorting = (event) => {
        setSortBy(event.target.value);
        store.dispatch({ type: 'Sort', payload: { by: event.target.value } });
    }

    return (
        <div>
            <Header />
            <div className='d-flex justify-content-center'>
                <h4 className='display-4'>Explore</h4>
            </div>
            <ExploreFilter show={show} handleClose={handleClose} filtering={filtering} brands={brands} filterBrands={filterBrands} filterGenders={filterGenders} filterTypes={filterTypes} />
            <div className='d-flex m-3 flex-wrap justify-content-around'>
                <Box className='mr-3' sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-select">Sort By</InputLabel>
                    <Select
                    id="grouped-select"
                    value={sortBy}
                    label="Sort By"
                    onChange={sorting}
                    >
                    <MenuItem value={"LATEST"}>Latest: Higher to Lower <ArrowDownwardOutlined/></MenuItem>
                    <MenuItem value={"priceDESC"}>Price: Higher to Lower <ArrowDownwardOutlined/></MenuItem>
                    <MenuItem value={"priceASC"}>Price: Lower to Higher <ArrowUpwardOutlined/></MenuItem>
                    <MenuItem value={"viewsDESC"}>Views: Higher to Lower <ArrowDownwardOutlined/></MenuItem>
                    <MenuItem value={"viewsASC"}>Views: Lower to Higher <ArrowUpwardOutlined/></MenuItem>
                    </Select>
                </FormControl>
                </Box>
                <ReactPaginate
                    nextLabel="Next"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="Previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination h5"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
                <Button variant="info" className='h5' onClick={handleShow}
                    style={{ color: 'white'}}>
                    Filters
                </Button>
            </div>
            <div className='d-flex flex-wrap justify-content-center'>
                    {(currentItems) ? currentItems.map((item) => <ExploreItems key={item._id} item={item} brands={brands} user={user} />) :<p></p>}
            </div>
            <Footer />
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.googleUser,
        shoesValue: state.explore.ShoesData,
        items: state.explore.items,
        filtersortBy: state.explore.sortBy,
        filterBrands: state.explore.brands,
        filterGenders: state.explore.genders,
        filterTypes: state.explore.types
    }
}
export default connect(mapStateToProps)(Explore);