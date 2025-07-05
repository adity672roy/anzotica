import React from "react";import Carousel from '../components/sliders/Carousel'
 import DestinationSlider from '../components/sliders/DestinationSlider'
 import HotelSlider from '../components/sliders/HotelSlider'
 import SwiperSlider from '../components/sliders/SwiperSlider' 

const Home = () => {
  return (
    <>
      <Carousel />
      <HotelSlider />
      <SwiperSlider />
      <DestinationSlider />
    </>
  );
};

export default Home;
