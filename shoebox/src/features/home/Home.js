import styled from 'styled-components'
import ImgSlider from '../../components/ImgSlider'
import Brand from './Brand'
import Header from '../../components/Header'
import NewArrival from './NewArrival'
import SlipOns from './SlipOns'
import LargeCategories from './LargeCategories'
import Footer from '../../components/Footer'

const brands = [
    {label: "Adidas", value: "Adidas", img: "https://greepx.com/wp-content/uploads/2020/02/adidas-wallpapers.jpg"},
    {label: "Nike", value: "Nike", img: "https://wallpaperaccess.com/full/135853.jpg"},
    {label: "Puma", value: "Puma", img: "https://logodix.com/logo/487483.png"},
    {label: "Vans", value: "Vans", img: "https://logodix.com/logo/487483.png"},
    {label: "Adidas2", value: "Adidas2", img: "https://greepx.com/wp-content/uploads/2020/02/adidas-wallpapers.jpg"},
];
function Home() {
    return (
        <div>
            <Header />
            <Container>
                <ImgSlider />
                <WrapContainer>
                {brands.map((b) => <Brand brand={b} brands={brands}/>)}
                </WrapContainer>
                {/* <Brand /> */}
                <NewArrival />
                <SlipOns />
                <br />
                <Advert>
                    <img className='gif' src='/images/adidas-ad.gif' alt="img-ad-1"/>
                    <img className='image' src='/images/adidas-ad-image.jpg' alt="img-ad-2"/>
                </Advert>

                <LargeCategories />
                <Footer />
            </Container>
        </div>
    )
}

export default Home;

const Container = styled.main`
    min-height : calc(100vh - 70px);
    padding : 0 calc(3.5vw + 5px);
    position: relative;
    overflow-x: hidden;
    
    &:before{
       
        content: "";
        position: absolute;
        top : 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
`
const Advert = styled.div`
width:100vw;
padding:5vw 10vw 5vw 10vw;
.gif {
    display: none;
}
.image {
    display:block;
}
    &:hover {
        .gif {
            display:block;
        }       
        .image {
            display:none;
        }
    }
`;
const WrapContainer = styled.div`
    margin-top: 30px;
    display: grid;
    padding: 30px 0 26px;
    grid-gap: 25px;
    grid-template-columns: repeat(5, minmax(0, 1fr));
`