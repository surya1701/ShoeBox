import { connect } from "react-redux";
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import PostItems from "./PostItems";

function Posts({ user, shoesValue, items, filtersortBy, filterBrands, filterGenders, filterTypes, brands }) {

    return (
        <div>
            <Header />
            <div className='d-flex justify-content-center'>
                <h4 className='display-4'>Posts</h4>
            </div>
            <div className='row g-0 mb-5'>
                <div className='col-lg-8 col-12 p-2 text-center'>
                    <div className='row g-0'>
                        {(items) ? items.map((item) =>
                        <div className='col-lg-6 col-12 p-2'>
                            <PostItems key={item._id} item={item} brands={brands} user={user} />
                        </div>
                        ) :<p></p>}
                    </div>
                </div>
                <div className='col-md-4 col-12 p-2'>
                    <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="shoesdotcom"
                        theme="dark"
                        options={{ height: "100vw" }}
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
        filtersortBy: state.explore.sortBy,
        filterBrands: state.explore.brands,
        filterGenders: state.explore.genders,
        filterTypes: state.explore.types
    }
}
export default connect(mapStateToProps)(Posts);