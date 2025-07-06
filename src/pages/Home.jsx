import React from "react";
import Carousel from '../components/sliders/Carousel'
 import DestinationSlider from '../components/sliders/DestinationSlider'
 import HotelSlider from '../components/sliders/HotelSlider'
 import SwiperSlider from '../components/sliders/SwiperSlider' 
 import Layout from '../layout/Layout' 

const Home = () => {
  return (
    <Layout>
      <Carousel />
      <HotelSlider />
      <SwiperSlider />
      <DestinationSlider />
    </Layout>
  );
};

export default Home;
