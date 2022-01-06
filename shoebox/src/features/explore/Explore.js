import { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { store } from '../../app/store';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import ExploreItems from "./ExploreItems";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import ArrowDownwardOutlined from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowUpwardOutlined from '@material-ui/icons/ArrowUpwardOutlined';
import { Button } from "react-bootstrap"
import ExploreFilter from './ExploreFilter';
import ReactPaginate from 'react-paginate';


function Explore({ user, shoesValue, items, filterBrands, filterGenders, filterTypes, brands }) {
    const itemsPerPage = 4;
    const [sortBy, setSortBy] = useState("viewsDESC");
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
        console.log(event.target.value);
        store.dispatch({ type: 'Sort', payload: { by: event.target.value } });
    }

    return (
        <div>
            <Header />
            <ExploreFilter show={show} handleClose={handleClose} filtering={filtering} brands={brands} filterBrands={filterBrands} filterGenders={filterGenders} filterTypes={filterTypes} />
            <div className='row g-0 mb-5'>
                <div className='col-md-8 col-12 p-2 text-center'>
                    <div className='row g-0'>
                        <div className='col-4'>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="grouped-select">Sort By</InputLabel>
                                <Select
                                id="grouped-select"
                                value={sortBy}
                                label="Sort By"
                                onChange={sorting}
                                >
                                <MenuItem value={"priceDESC"}>Price: Higher to Lower <ArrowDownwardOutlined/></MenuItem>
                                <MenuItem value={"priceASC"}>Price: Lower to Higher <ArrowUpwardOutlined/></MenuItem>
                                <MenuItem value={"viewsDESC"}>Views: Higher to Lower <ArrowDownwardOutlined/></MenuItem>
                                <MenuItem value={"viewsASC"}>Views: Lower to Higher <ArrowUpwardOutlined/></MenuItem>
                                </Select>
                            </FormControl>
                            </Box>
                        </div>
                        <div className='col-8 p-1'>
                            {/* <div className="d-grid gap-2 mb-3"> */}
                            <Button variant="info" size="lg" className='float-right' onClick={handleShow}
                                style={{ color: 'white', fontWeight: '200', fontFamily: 'sans-serif' }}>
                                Filters
                            </Button>
                            {/* </div> */}
                        </div>
                    </div>
                    {currentItems &&
                        currentItems.map((item) => (
                            <ExploreItems key={item.id} item={item} brands={brands} user={user} />
                        ))}
                </div>
                <div className='col-md-4 col-12 p-2'>
                    <ReactPaginate
                        nextLabel=">>"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="<<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                    <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="shoesdotcom"
                        theme="dark"
                        options={{ height: "75vh" }}

                    />
                </div>
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
        filterBrands: state.explore.brands,
        filterGenders: state.explore.genders,
        filterTypes: state.explore.types
    }
}
export default connect(mapStateToProps)(Explore);