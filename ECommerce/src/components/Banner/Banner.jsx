// Banner.js

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Banner.css'; // Create this file for your custom styles

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
          <img src="https://img.freepik.com/premium-psd/banner-template-online-fashion-sale_23-2148585403.jpg" alt="Slide 1" />
        </div>
        <div className="Banner-slide">
          <img src="https://img.freepik.com/free-psd/fashion-store-banner-template_23-2148675200.jpg" alt="Slide 2" />
        </div>
        <div className="Banner-slide">
          <img src="https://i.pinimg.com/736x/b9/d8/04/b9d804b15a17b2535f167556eaf9ddf5.jpg" alt="Slide 2" />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
