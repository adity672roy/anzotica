const hotels = [
  {
    number: "01",
    name: "The Ritz-Carlton, Dubai",
    image:
      "https://images.unsplash.com/photo-1705346435684-a9de6cbb53dc?w=600&auto=format&fit=crop&q=60",
    description:
      "Luxury beach resort with skyline views and elegant Arabian design.",
  },
  {
    number: "02",
    name: "Zadún, a Ritz-Carlton",
    image:
      "https://plus.unsplash.com/premium_photo-1718285549233-42414e1c16f9?w=600&auto=format&fit=crop&q=60",
    description:
      "Desert escape offering personalized service and immersive natural beauty.",
  },
  {
    number: "03",
    name: "The Ritz-Carlton, Jeddah",
    image:
      "https://images.unsplash.com/photo-1568812315803-7f6419ff8d3e?w=600&auto=format&fit=crop&q=60",
    description:
      "Palatial Red Sea hotel with regal interiors and historic charm.",
  },
  {
    number: "04",
    name: "The Ritz-Carlton, Geneva",
    image:
      "https://images.unsplash.com/photo-1686529481396-1bdd63c0a544?q=80&w=687&auto=format&fit=crop",
    description:
      "Lakeside landmark blending heritage architecture and contemporary Swiss elegance.",
  },
  {
    number: "05",
    name: "The Ritz-Carlton, Tokyo",
    image:
      "https://plus.unsplash.com/premium_photo-1718285549990-74ef9fb74946?w=600&auto=format&fit=crop&q=60",
    description:
      "Skyscraper luxury with panoramic city views and refined Japanese service.",
  },
  {
    number: "06",
    name: "The Ritz-Carlton, Bali",
    image:
      "https://plus.unsplash.com/premium_photo-1676049111274-3ec809c03516?w=600&auto=format&fit=crop&q=60",
    description:
      "Clifftop retreat featuring oceanfront villas and Balinese cultural experiences.",
  },
  {
    number: "07",
    name: "The Ritz-Carlton, Kyoto",
    image:
      "https://images.unsplash.com/photo-1610036615605-636de68a306e?w=600&auto=format&fit=crop&q=60",
    description:
      "Riverfront elegance combining Zen design and traditional Kyoto hospitality.",
  },
  {
    number: "08",
    name: "The Ritz-Carlton, Maldives",
    image:
      "https://images.unsplash.com/photo-1490761668535-35497054764d?w=600&auto=format&fit=crop&q=60",
    description:
      "Overwater villas offering secluded luxury amid turquoise island serenity.",
  },
];

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "../heading/Heading";
import SliderNavigation from "./SliderNavigation";

const SwiperSlider = () => {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const totalSlides = hotels.length;
  const progressPercent = ((activeIndex + 1) / totalSlides) * 100;

  return (
    <section className="w-full py-16 overflow-hidden">
      <Heading
        subHeading={"Where to Go Next"}
        heading={"New Hotels"}
        description={
          "Boundary-pushing architecture, innovative amenities, intriguing destinations — all with legendary Ritz-Carlton service and attention to detail. Discover the newest hotels and resorts from The Ritz-Carlton and open up a world of possibility."
        }
        buttonText={"See What’s New"}
      />

      <Swiper
        className="cursor-grab"
        modules={[Navigation]}
        loop={true}
        centeredSlides={true}
        breakpoints={{
          0: {
            spaceBetween: 40,
          },

          1024: {
            spaceBetween: 60,
          },
          1240: {
            spaceBetween: 100,
          },
        }}
        slidesPerView="auto"
        speed={1000}
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
              className={`relative ${
                index % 2 === 0 ? "top-10" : "top-0"
              } py-16 md:px-6 !w-full md:!w-[55%]`}
            >
              <div className="h-full relative ">
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.4,
                    ease: "linear",
                  }}
                  className="shadow-xl flex justify-center items-center  h-[400px]"
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={activeIndex}
                      initial={{
                        opacity: 0,
                        x: 150,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        x: -150,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "linear",
                      }}
                      className={`absolute z-50 ${
                        index % 2 === 0 ? "-top-10" : "-bottom-10"
                      } md:-right-16 max-md:left-1/2 max-md:-translate-x-1/2  w-[80%] max-w-sm border-2 border-[#8B6A29] shadow-lg   md:p-2 p-1`}
                    >
                      <div className="text-center w-full flex gap-2 flex-col items-center justify-center text-black h-full  bg-zinc-100 md:p-6 p-2 max-w-md  ">
                        <p className="text-[10px] uppercase tracking-widest">
                          Now Open
                        </p>
                        <h3 className="text-xl font-serif w-full">
                          {hotel.name}
                        </h3>
                        <p className="text-sm leading-relaxed">
                          {hotel.description}
                        </p>
                        <button className="cursor-pointer font-semibold border-b-2 border-black transition pt-2">
                          Explore More
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="mt-10 text-center">
        <SliderNavigation
          current={activeIndex + 1}
          total={totalSlides}
          progress={progressPercent}
          onPrev={() => {
            setDirection("prev");
            swiperRef.current?.slidePrev();
          }}
          onNext={() => {
            setDirection("next");
            swiperRef.current?.slideNext();
          }}
        />
      </div>
    </section>
  );
};

export default SwiperSlider;
