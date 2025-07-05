import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import Heading from "../heading/Heading";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const hotels = [
  {
    number: "01",
    name: "The Ritz-Carlton, Dubai",
    image:
      "https://images.unsplash.com/photo-1705346435684-a9de6cbb53dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhY2VzfGVufDB8MXwwfHx8MA%3D%3D",
  },
  {
    number: "02",
    name: "Zadún, a Ritz-Carlton Reserve",
    image:
      "https://plus.unsplash.com/premium_photo-1718285549233-42414e1c16f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2VzfGVufDB8MXwwfHx8MA%3D%3D",
  },
  {
    number: "03",
    name: "The Ritz-Carlton, Jeddah",
    image:
      "https://images.unsplash.com/photo-1568812315803-7f6419ff8d3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGxhY2VzfGVufDB8MXwwfHx8MA%3D%3D",
  },
  {
    number: "04",
    name: "The Ritz-Carlton Hotel de la Paix, Geneva",
    image:
      "https://images.unsplash.com/photo-1686529481396-1bdd63c0a544?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    number: "05",
    name: "The Ritz-Carlton, Tokyo",
    image:
      "https://plus.unsplash.com/premium_photo-1718285549990-74ef9fb74946?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGxhY2VzfGVufDB8MXwwfHx8MA%3D%3D",
  },
  {
    number: "06",
    name: "The Ritz-Carlton, Bali",
    image:
      "https://plus.unsplash.com/premium_photo-1676049111274-3ec809c03516?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBsYWNlc3xlbnwwfDF8MHx8fDA%3D",
  },
  {
    number: "07",
    name: "The Ritz-Carlton, Kyoto",
    image:
      "https://images.unsplash.com/photo-1610036615605-636de68a306e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGxhY2VzfGVufDB8MXwwfHx8MA%3D%3D",
  },
  {
    number: "08",
    name: "The Ritz-Carlton, Maldives",
    image:
      "https://images.unsplash.com/photo-1490761668535-35497054764d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBsYWNlc3xlbnwwfDF8MHx8fDA%3D",
  },
];

const HotelSlider =() =>{
  const [startIndex, setStartIndex] = useState(0);
  const [perPage, setPerPage] = useState(4);

  useEffect(() => {
    const updatePerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPerPage(2); // < sm
      } else if (width < 768) {
        setPerPage(3); // sm
      } else {
        setPerPage(4); // md and up
      }
    };

    updatePerPage(); // on load
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  const getVisibleHotels = () => {
    const visible = [];
    for (let i = 0; i < perPage; i++) {
      const index = (startIndex + i) % hotels.length;
      visible.push(hotels[index]);
    }
    return visible;
  };
  const next = () => {
    setStartIndex((prev) => (prev + 1) % hotels.length);
  };
  const prev = () => {
    setStartIndex((prev) => (prev - 1 + hotels.length) % hotels.length);
  };

  const handleDragEnd = (e, info) => {
    if (info.offset.x < -50) next();
    else if (info.offset.x > 50) prev();
  };
  const progress = ((startIndex + 1) / hotels.length) * 100;

  return (
    <section className="bg-zinc-900 text-white">
      <div className="w-full   overflow-x-hidden max-w-6xl mx-auto py-10 px-2">
        <Heading subHeading={"Destinations"} heading={"Journey Farther"}  />
        <AnimatePresence mode="wait">
          <motion.div
            key={startIndex}
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                
            transition={{ ease: "linear" }}
            className="flex  h-[450px] items-center justify-center  cursor-grab "
          >
            {getVisibleHotels().map((hotel, i) => (
              <motion.div
                key={i}
                initial={{ y: 0 }}
                 animate={{
                  y: i % 2 === 0 ? -20 : 20,  
                }}
                transition={{ duration: 0.3, ease: "linear" }}  
                className="w-[300px]  flex  items-center justify-center flex-col gap-4 border-r border-zinc-800 px-4 sm:px-6 md:px-8 lg:px-10 "
              >
                <div className="text-5xl text-left w-full text-[#8B6A29] font-serif">
                  {hotel.number}
                </div>
                <div className="overflow-hidden relative "
                >
                  <div className="absolute top-0 left-0 h-full w-full"></div>
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-[200px] h-64 object-cover"
                  />
                </div>
                <p className="text-xl text-left w-full font-extralight leading-snug text-zinc-100">
                  {hotel.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Controls + Progress */}
        <div className=" md:max-w-md max-w-2xs mx-auto flex items-center justify-between mt-8">
          <button
            className="flex items-center gap-1 cursor-pointer text-sm text-neutral-600"
            onClick={prev}
          >
            <IoChevronBack size={18} />
            <span className="hidden md:inline-block">Previous</span>
          </button>

          <div className="w-full mx-2 relative h-1 bg-gray-300   overflow-hidden">
            <motion.div
              className="h-full bg-[#8B6A29]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.3 }}
            />
          </div>

          <button
            className="flex items-center gap-1 cursor-pointer text-sm text-neutral-600"
            onClick={next}
          >
            <span className="hidden md:inline-block">Next</span>
            <IoChevronForward size={18} />
          </button>
        </div>

        {/* Optional Text Info */}
        <p className="text-center text-sm text-gray-500 mt-2">
          {startIndex + 1} / {hotels.length}
        </p>
      </div>
    </section>
  );
}
export default  HotelSlider