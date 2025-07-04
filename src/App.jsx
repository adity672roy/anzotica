 import React from "react"; 
 import Navbar from './header/Navbar'
 import Carousel from './sliders/Carousel'
 import DestinationSlider from './sliders/DestinationSlider'
 import HotelSlider from './sliders/HotelSlider'
 import SwiperSlider from './sliders/SwiperSlider'

const App = () => {
  return (
    <div className=" ">
      <Navbar />
      <Carousel />
      <HotelSlider />
      <SwiperSlider/>
      <DestinationSlider />
    </div>
  );
};

export default App;

