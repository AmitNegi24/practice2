// Banner.js

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Banner.css'; 
import portfolio1 from '../../assets/portfolio1.jpeg';
import portfolio2 from '../../assets/portfolio2.jpeg';
import portfolio3 from '../../assets/portfolio3.jpeg';

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500, // Adjust the autoplay speed (in milliseconds) as needed
  };

  return (
    <div className="Banner-container">
      <Slider {...settings}>
        {/* Your Banner slides go here */}
        <div className="Banner-slide">
          <img src={portfolio1} alt="Slide 1" />
        </div>
        <div className="Banner-slide">
          <img src={portfolio2} alt="Slide 2" />
        </div>
        <div className="Banner-slide">
          <img src={portfolio3} alt="Slide 2" />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
