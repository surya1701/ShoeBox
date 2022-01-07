import styled from 'styled-components';
import ImgSlider from '../../components/ImgSlider';
import Brand from './Brand';
import Header from '../../components/Header';
import MostViewed from './MostViewed';
import Random from './Random';
import LargeCategories from './LargeCategories';
import Footer from '../../components/Footer';

function Home({ brands }) {

    return (
        <div>
            <Header />
            <Container>
                <ImgSlider />
                <WrapContainer>
                    {brands.map((b) => <Brand key={b.id} brand={b} brands={brands} />)}
                </WrapContainer>
                {/* <Brand /> */}
                <MostViewed />
                <Random />
                <br />
                <Advert>
                    <img className='gif' src='/images/adidas-ad.gif' alt="img-ad-1" />
                    <img className='image' src='/images/adidas-ad-image.jpg' alt="img-ad-2" />
                </Advert>

                <LargeCategories />
                <hr />
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
    width: 90%;
}
.image {
    display:block;
    width: 90%;
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