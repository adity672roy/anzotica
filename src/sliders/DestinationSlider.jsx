import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {  FaPlus } from "react-icons/fa";
import Heading from "../heading/Heading";

const data = [
  {
    title: "Red Sea, Saudi Arabia",
    description:
      "Nujuma, a Ritz-Carlton Reserve, is rooted in rich cultural traditions, pristine natural beauty, and flavors as vivid as the sea itself. This secluded destination offers serenity amidst the dunes and stars.",
    image: "https://www1.lovethatdesign.com/wp-content/uploads/2024/04/Sheybarah_hero-1.jpg",
  },
  {
    title: "Guanacaste, Costa Rica",
    description:
      "Tucked between lush rainforests and the Pacific Ocean, Guanacaste offers eco-adventures, vibrant biodiversity, and refined coastal luxury. A true escape into nature’s wonders.",
    image: "https://www.riuguanacaste.com/images/gallery/gallery-3.jpg",
  },
  {
    title: "Jiuzhaigou, China",
    description:
      "A mystical valley of turquoise lakes and misty mountains, Jiuzhaigou enchants visitors with its serene beauty and cultural depth. It’s a tranquil retreat into nature’s masterpiece.",
    image: "https://www.banyantree.com/assets/2021-12/bt-jiuzhaigou-lobby-lounge-intro.jpg",
  },
  {
    title: "Los Cabos, Mexico",
    description:
      "Where desert landscapes meet the sea, Los Cabos captivates with dramatic coastlines, vibrant nightlife, and luxurious oceanfront living. A blend of adventure and indulgence.",
    image: "https://www.royalsolarisloscabo.com/images/gallery/gallery-4.jpg",
  },
];



const DestinationSlider=()=> {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = (i) => {
    setActiveIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className=" text-white  min-h-screen bg-zinc-900  ">
    <div className="max-w-6xl mx-auto flex flex-col items-center justify-center h-full   px-4 py-8">
      <Heading subHeading={"The Journey"} heading={"Of a Lifetime"} description={"Let The Ritz-Carlton take you to the ends of the earth. Discover distinctive resorts in the world’s rarest escapes through Ritz-Carlton Reserve, where immersive experiences and unspoiled natural splendor forge lasting connections."} buttonText={"Explore Ritz-Carlton Reserve"}/>
      <div className="flex max-md:flex-col sm:pt-10 pt-6 md:pt-20 gap-10 w-full max-w-5xl overflow-hidden ">
        {data.map((person, i) => {
          const isActive = activeIndex === i;
          const yOffset = isMobile ? 0 : i % 2 === 0 ? -20 : 20;

          return (
            <motion.div
              key={i}
              onClick={() => handleClick(i)}
              animate={{
                ...(isMobile
                  ? { height: isActive ? 400 : 100 }
                  : { flex: isActive ? 4 : 1 }),
                y: yOffset,
              }}
              transition={{ duration: 0.5, ease: "linear" }}
              className={`relative ${
                isMobile ? "w-full" : "h-[500px]"
              } cursor-pointer overflow-hidden group   flex-shrink-0 transition-all duration-300 bg-pink-800 ease-linear`}
            >
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-full  object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className={` bg-black/50 absolute inset-0   flex items-center justify-center text-white`}>
                {!isActive ? (
                  <div className="transform -rotate-90 whitespace-nowrap text-xl font-extrabold   uppercase max-md:rotate-0">
                    {person.title}
                  </div>
                ) : (
                  <div className="flex flex-col justify-end items-start h-full w-full p-6">
                    <motion.div
                      initial={{ opacity: 0 , y: i % 2 === 0 ?   20 :  0  }}
                       animate={{ opacity: 1, y: i % 2 === 0 ?   0 : -20 }}
                      transition={{ ease : "linear" ,duration: 0.5, delay: 1 }}
                      className="text-3xl font-bold font-serif"
                    >
                      {person.title}
                    </motion.div>
                     
                    <motion.div
                      initial={{ opacity: 0 , y: i % 2 === 0 ?   20 : 0  }}
                       animate={{ opacity: 1, y: i % 2 === 0 ?   0 : -20 }}
                      transition={{ delay: 1, duration: 0.5, ease : "linear" }}
                      className=" font-normal pl-6 mt-1"
                    >
                      {person.description}
                    </motion.div>
                  </div>
                )}
              </div>
              {!isActive && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(i);
                  }}
                  className={`absolute ${
                    isMobile
                      ? "bottom-2"
                      : i % 2 === 0
                      ? "bottom-6"
                      : "bottom-10"
                  } right-3 bg-black text-white border-2 border-white rounded-full w-8 h-8 text-xl font-bold flex items-center justify-center shadow-md hover:scale-110 transition`}
                >
                  <FaPlus size={12} />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
export default   DestinationSlider