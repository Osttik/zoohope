import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { requestURL } from "../../api/api";
import pet from "../../images/icons/pet.svg";

const CustomNextArrow = (props: { onClick?: (_: any) => void}) => {
  const { onClick } = props;
  return <div className="slick-arrow-next" onClick={onClick}></div>;
};

const CustomPrevArrow = (props: { onClick?: (_: any) => void}) => {
  const { onClick } = props;
  return <div className="slick-arrow-prev" onClick={onClick}></div>;
};

interface IProps {
  images: string[]
}

const Carousel = ({ images }: IProps) => {
  const settings = {
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i: number) {
      return (
        <img className="listImgSlide" src={`${requestURL}/${images[i]}`} alt={`Slide ${i + 1}`} onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = pet;
        }} />
      );
    }
  };

  return (
    <Slider {...settings}>
      {images.map((imageUrl: string, index: number) => (
        <div key={index}>
          <img className="imgSlide" src={`${requestURL}/${imageUrl}`} alt={`Slide ${index + 1}`} onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = pet;
        }} />
        </div>
      ))}
    </Slider>
  );
}

export default Carousel;