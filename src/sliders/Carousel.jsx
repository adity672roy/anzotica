import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IoChevronBack,
  IoChevronForward,
   
} from "react-icons/io5";
import {  BsPause,
  BsPlay ,} from "react-icons/bs";

const slides = [
  {
    title: "Oceanfront Escape",
    subtitle: "Where Waves Meet Wonder",
    img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  },
  {
    title: "Breathtaking Views",
    subtitle: "Nature at Its Finest",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },

  {
    title: "Mountain Majesty",
    subtitle: "Breathe in the Fresh Air",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  },
  {
    title: "Timeless Elegance",
    subtitle: "Classic and Refined",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
  },
];

const Carousel = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef(null);

  const thumbContainerRef = useRef(null);
  const thumbRefs = useRef([]);
  const rotatedSlides = [
    ...slides.map((slide, index) => ({ ...slide, index })).slice(active),
    ...slides.map((slide, index) => ({ ...slide, index })).slice(0, active),
  ];

  useEffect(() => {
    if (
      thumbContainerRef.current &&
      thumbRefs.current[active] &&
      thumbRefs.current[active].offsetLeft
    ) {
      const container = thumbContainerRef.current;
      const thumbnail = thumbRefs.current[active];

      const scrollLeft =
        thumbnail.offsetLeft -
        container.offsetWidth / 2 +
        thumbnail.offsetWidth / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [active]);

  const paginate = (dir) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!paused) {
      timeoutRef.current = setInterval(() => paginate(1), 4000);
      return () => clearInterval(timeoutRef.current);
    } else {
      clearInterval(timeoutRef.current);
    }
  }, [active, paused]);

  const variants = {
    enter: (direction) => ({
      opacity: 0,
      scale: 1.03,
      x: direction > 0 ? 10 : -10,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "linear",
      },
    },
    exit: (direction) => ({
      opacity: 0,
      scale: 0.97,
      x: direction > 0 ? -10 : 10,
    }),
  };

  return (
    <section className="relative bg-black max-w-5xl mx-auto w-full h-screen overflow-hidden font-serif">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={active}
          className="absolute  w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[active].img})` }}
          variants={variants}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", stiffness: 60, damping: 20 }}
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <motion.div
            className="absolute top-1/2 left-4  z-20 text-white text-left   -translate-y-1/2 px-4"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            exit={{ y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <p className="uppercase text-sm tracking-widest text-gray-300 mb-2">
              Where to Go Next
            </p>
            <h2 className="text-4xl md:text-6xl font-bold mb-3 drop-shadow-xl">
              {slides[active].title}
            </h2>
            <p className="text-xl md:text-2xl text-gray-100 font-light">
              {slides[active].subtitle}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div
        ref={thumbContainerRef}
        className="absolute bottom-14 left-1/2 md:left-auto md:right-4 -translate-x-1/2 md:translate-x-0 z-30 md:max-w-xs max-w-2xs w-full overflow-x-auto px-2 py-2  scrollbar-hide"
      >
        <div className="flex gap-4 items-end w-max">
          <div className="flex gap-4 items-end w-max">
            {rotatedSlides.map((slide, i) => (
              <img
                key={slide.index}
                ref={(el) => (thumbRefs.current[slide.index] = el)}
                src={slide.img}
                alt={`Slide ${slide.index + 1}`}
                onClick={() => {
                  setDirection(slide.index > active ? 1 : -1);
                  setActive(slide.index);
                }}
                className={`object-cover rounded-md cursor-pointer transition-all duration-500 ease-linear border-2 shrink-0
          ${
            slide.index === active
              ? "md:w-28 w-16 md:h-40 h-20 border-white z-10"
              : "md:w-20 w-10 md:h-28 h-12 border-transparent opacity-70 hover:opacity-100"
          }
        `}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 left-1/2 md:left-auto md:right-4 -translate-x-1/2 md:translate-x-0 z-30   backdrop-blur-md py-1 px-4   w-fit">
        <div className="flex items-center justify-between gap-2 max-w-[300px]">
          {/* ⬅️ Prev */}
          <button
            onClick={() => paginate(-1)}
            className="p-2 rounded-full  cursor-pointer border border-white hover:bg-white/30   transition"
          >
            <IoChevronBack className="text-white w-4 h-4" />
          </button>
          <button
            onClick={() => setPaused((prev) => !prev)}
            className="p-2 rounded-full cursor-pointer   border border-white hover:bg-white/30   transition"
          >
            {paused ? (
              <BsPlay  className="text-white w-4 h-4" />
            ) : (
              <BsPause className="text-white w-4 h-4" />
            )}
          </button>

          {/* Next */}
          <button
            onClick={() => paginate(1)}
            className="p-2 rounded-full cursor-pointer  border border-white hover:bg-white/30   transition"
          >
            <IoChevronForward className="text-white w-4 h-4" />
          </button>

          {/* Progress bar */}
          <div className="h-1 w-28 bg-white/20 overflow-hidden  ">
            <div
              className="h-full bg-white transition-all duration-500 ease-linear"
              style={{ width: `${((active + 1) / slides.length) * 100}%` }}
            />
          </div>

          {/* Counter */}
          <span className="text-white text-sm font-medium min-w-fit text-right">
            {active + 1}
          </span>
        </div>
      </div>
    </section>
  );
};
export default Carousel;
