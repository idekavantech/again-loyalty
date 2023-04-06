import Image from "next/image";
import { memo } from "react"
import Slider from "react-slick";
import {
  SLIDE1,
  SLIDE2,
  SLIDE3,
  SLIDE4,
  SLIDE5,
  SLIDE6,
  SLIDE7,
} from "utils/constants/SLIDES";

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  dots: true,
  arrows: false,
  speed: 300,
  slidesToShow: 3,
  centerPadding: "0",
  swipeToSlide: true,
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 1490,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        className: "center",
        centerMode: true,
        infinite: true,
        dots: true,
        arrows: false,
        speed: 300,
      },
    },
  ],
};

const siteExample = [SLIDE1, SLIDE2, SLIDE3, SLIDE4, SLIDE5, SLIDE6, SLIDE7];

function SlideShow() {
  return <Slider {...settings}>
    {siteExample.map((item) => (
      <div className="image-container" key={item}>
        <Image
          unoptimized
          priority
          layout="fill"
          className="image"
          src={item}
          alt="نمونه سایت"
        />
      </div>
    ))}
  </Slider>
}

export default memo(SlideShow)