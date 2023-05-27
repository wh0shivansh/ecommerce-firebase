import React, { useState } from 'react';
import {Carousel} from 'react-bootstrap';
import Banner1 from '../Assets/banner1.jpg';
import Banner2 from '../Assets/banner2.jpg';
import Banner3 from '../Assets/banner3.jpg';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Banner.css";

const Banner = () => {
    
  return (
    <div className='banner'>
 <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 banner-img"
          src={Banner1}
          alt="First slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 banner-img"
          src={Banner2}
          alt="Second slide"
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 banner-img"
          src={Banner3}
          alt="Third slide"
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default Banner