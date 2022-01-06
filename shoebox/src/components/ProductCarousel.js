import {Carousel} from "react-bootstrap"
import PrismaZoom from 'react-prismazoom'

const ProductCarousel = ({images}) => {
    return (
    <Carousel variant="dark" style={{overflow: "hidden"}}>
    {images.map((url) =>
    <Carousel.Item key={url}>
        <PrismaZoom>
        <img alt='' src={url} width={400} />
        </PrismaZoom>
    </Carousel.Item>
    )}
    </Carousel>
    )
}
export default ProductCarousel;