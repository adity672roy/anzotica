
const hotels = [
  {
    number: "01",
    name: "The Ritz-Carlton, Dubai",
    image:
      "https://images.unsplash.com/photo-1705346435684-a9de6cbb53dc?w=600&auto=format&fit=crop&q=60",
  },
  {
    number: "02",
    name: "Zadún, a Ritz-Carlton Reserve",
    image:
      "https://plus.unsplash.com/premium_photo-1718285549233-42414e1c16f9?w=600&auto=format&fit=crop&q=60",
  },
  {
    number: "03",
    name: "The Ritz-Carlton, Jeddah",
    image:
      "https://images.unsplash.com/photo-1568812315803-7f6419ff8d3e?w=600&auto=format&fit=crop&q=60",
  },
  {
    number: "04",
    name: "The Ritz-Carlton Hotel de la Paix, Geneva",
    image:
      "https://images.unsplash.com/photo-1686529481396-1bdd63c0a544?q=80&w=687&auto=format&fit=crop",
  },
  {
    number: "05",
    name: "The Ritz-Carlton, Tokyo",
    image:
      "https://plus.unsplash.com/premium_photo-1718285549990-74ef9fb74946?w=600&auto=format&fit=crop&q=60",
  },
  {
    number: "06",
    name: "The Ritz-Carlton, Bali",
    image:
      "https://plus.unsplash.com/premium_photo-1676049111274-3ec809c03516?w=600&auto=format&fit=crop&q=60",
  },
  {
    number: "07",
    name: "The Ritz-Carlton, Kyoto",
    image:
      "https://images.unsplash.com/photo-1610036615605-636de68a306e?w=600&auto=format&fit=crop&q=60",
  },
  {
    number: "08",
    name: "The Ritz-Carlton, Maldives",
    image:
      "https://images.unsplash.com/photo-1490761668535-35497054764d?w=600&auto=format&fit=crop&q=60",
  },
]; 








import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { motion } from "framer-motion";
import Heading from "../heading/Heading";

const SwiperSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const totalSlides = hotels.length;
  const progressPercent = ((activeIndex + 1) / totalSlides) * 100;
 
  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      prevRef.current &&
      nextRef.current
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;

      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <section className="w-full py-16 px-4 bg-[#e8f1fa] overflow-hidden">
      <Heading/>
      <Swiper
        className="cursor-grab"
        modules={[Navigation]}
        loop={true}
        centeredSlides={true}
        spaceBetween={20}
        slidesPerView="auto"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {hotels.map((hotel, index) => {
          const isActive = index === activeIndex;
          return (
            <SwiperSlide
              key={index}
              className="!w-full md:!w-[50%] transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: isActive ? 1 : 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative flex items-center justify-center"
              >
                <div className="w-full h-[400px]">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute z-50 top-0 left-0 bg-black/50 shadow-lg h-full w-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 30,
                    }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-start justify-end text-white h-full gap-2 p-4 max-w-md mr-auto"
                  >
                    <p className="text-xs uppercase font-bold tracking-widest">
                      Now Open
                    </p>
                    <h3 className="text-2xl font-extrabold text-start">
                      {hotel.name}
                    </h3>
                    <p className="text-sm text-start leading-relaxed">
                      Nestled in the heart of a stunning destination, this
                      hotel blends local culture with modern luxury.
                    </p>
                    <button className="cursor-pointer font-semibold border-b-2 border-white transition">
                      Explore More
                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Progress + Navigation */}
      <div className="mt-10 text-center">
        <div className="flex items-center justify-center gap-4 text-sm font-medium text-black">
          <button
            ref={prevRef}
            className="flex cursor-pointer items-center gap-2"
          >
            <HiChevronLeft className="text-lg" />
            <span className="hidden md:inline-block">Previous</span>
          </button>

          <div className="relative w-56 h-0.5 bg-gray-300 mx-4">
            <div
              className="absolute h-1 bg-black transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <button
            ref={nextRef}
            className="flex cursor-pointer items-center gap-2"
          >
            <span className="hidden md:inline-block">Next</span>
            <HiChevronRight className="text-lg" />
          </button>
        </div>

        <div className="mt-2 text-base font-semibold text-black">
          {activeIndex + 1} / {totalSlides}
        </div>
      </div>
    </section>
  );
};

export default SwiperSlider;

