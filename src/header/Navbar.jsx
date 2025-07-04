 
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoChevronForward, IoChevronBack } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import NavAccordian from "./NavAccordian";
import {navData} from '../data'

 const Navbar = ()=> {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [active, setActive] = useState(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState(null);
  const [activeMobileSubsection, setActiveMobileSubsection] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActive(null);
        setSectionIndex(0);
      }
    };
    const handleScroll = () => setScrolled(window.scrollY > 10);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isMega = (key) =>
    Array.isArray(navData[key]) &&
    navData[key][0]?.left &&
    navData[key][0]?.right;

  const isSimpleLink = (data) =>
    data.length === 1 && !data[0].left && !data[0].title;

  return (
    <>
      {/* Top Header */}
      <header className="max-lg:sticky max-lg:top-0 max-lg:shadow bg-white px-4 sm:px-6 z-[999]">
        <div className="max-w-5xl mx-auto border-b border-gray-50/5 md:py-3 py-2 flex justify-between items-center">
          <div className="flex items-center sm:gap-4 gap-2">
            <button
              className="lg:hidden cursor-pointer"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {!showMobileMenu ? (
                <IoIosMenu size={20} />
              ) : (
                <IoClose size={24} />
              )}
            </button>
            <a href="/" className="font-serif sm:text-sm text-xs font-semibold uppercase tracking-wide">
              THE RITZ-CARLTON
            </a>
          </div>
          <div className="flex items-center gap-4 md:gap-6 text-sm font-medium text-gray-800">
            <div className="flex items-center space-x-1 hover:text-black cursor-pointer">
              <FaEarthAmericas />
              <span className="max-lg:hidden">English</span>
            </div>
            <button className="hidden lg:block border border-black w-[150px] py-4 text-xs font-semibold duration-1000  hover:bg-black hover:text-white transition">
              Sign in or Join
            </button>
            <button className="lg:hidden py-2  cursor-pointer">
              <FaRegUser />
            </button>
          </div>
        </div>
      </header>
 
      <div
        className={`hidden lg:block sticky px-6 top-0 z-40 shadow-md transition-colors duration-300 ${
          scrolled ? "bg-[#ffffffe6]" : "bg-white"
        }`}
      >
        <div className="flex justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-4 text-sm font-medium">
            {Object.entries(navData).map(([key, data]) =>
              isSimpleLink(data) ? (
                <a
                  key={key}
                  href={data[0].to}
                  className={`text-zinc-900 h-full flex items-center text-xs uppercase py-3 hover:text-black hover:border-b-4 hover:border-black ${
                    active === key ? "border-b-4 border-black" : ""
                  }`}
                >
                  {key}
                </a>
              ) : (
                <button
                  key={key}
                  onClick={() => {
                    setActive(active === key ? null : key);
                    setSectionIndex(0);
                  }}
                  className={`text-zinc-900 h-full text-xs uppercase py-3 hover:text-black hover:border-b-4 hover:border-black ${
                    active === key ? "border-b-4 border-black" : ""
                  }`}
                >
                  {key}
                </button>
              )
            )}
          </div>
          <button className="bg-black text-white text-xs w-[150px] py-4 font-bold hover:bg-zinc-900 my-2 transition">
            Reservations
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                ref={dropdownRef}
                className="absolute top-full left-0 right-0 z-10 mx-auto max-w-5xl"
              >
                <div className="absolute top-2 right-2">
                  <button onClick={() => setActive(null)}>
                    <IoClose size={20} />
                  </button>
                </div>
                {isMega(active) ? (
                  <div className="md:flex shadow-md h-[420px] bg-[#e0e3ec]">
                    <div className="flex flex-col w-full md:w-1/3 bg-white">
                      {navData[active].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSectionIndex(idx)}
                          className={`text-left flex justify-between p-4 pl-6         font-serif font-medium ${
                            idx === sectionIndex && "text-zinc-800 bg-[#e0e3ec]"
                          }`}
                        >
                          {item.title}
                          {idx === sectionIndex && (
                            <IoChevronForward color="#926f29" size={16} />
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-col justify-center md:flex-row h-full gap-6 md:gap-6 md:w-2/3 p-6">
                      <ul className="w-[65%] flex flex-col gap-6 border-r border-zinc-300 pl-12 pt-6 text-xs font-semibold">
                        {navData[active][sectionIndex].left.map((item, idx) => {
                          const label =
                            typeof item === "string" ? item : item.label;
                          return (
                            <li
                              key={idx}
                              onMouseEnter={() => setIsHovered(idx)}
                              onMouseLeave={() => setIsHovered(null)}
                              className="relative cursor-pointer w-fit"
                            >
                              {label}
                              {isHovered === idx && (
                                <motion.div
                                  layoutId="underline"
                                  className="h-[2px] bg-black absolute left-0 -bottom-1"
                                  initial={{ width: 0 }}
                                  animate={{ width: "100%" }}
                                  exit={{ width: 0 }}
                                  transition={{ duration: 0.3 }}
                                />
                              )}
                            </li>
                          );
                        })}
                      </ul>
                      <div className="w-[35%] flex flex-col items-start gap-4 py-2">
                        <img
                          src={navData[active][sectionIndex].right.image}
                          alt={navData[active][sectionIndex].right.title}
                          className="w-full max-w-2xs"
                        />
                        <div>
                          <h3 className="text-xs tracking-wide font-sans uppercase">
                            {navData[active][sectionIndex].right.title}
                          </h3>
                          <p className="mt-2 font-serif text-zinc-800">
                            {navData[active][sectionIndex].right.text}
                          </p>
                        </div>
                        <button className="text-sm font-semibold pb-1 border-b-2 border-black">
                          {navData[active][sectionIndex].right.button}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ul className="flex shadow bg-white flex-col">
                    {navData[active].map((item, idx) => (
                      <li
                        key={idx}
                        className="hover:underline hover:bg-blue-50 p-4"
                      >
                        <a
                          href={item.to}
                          className="font-serif text-gray-700"
                          onClick={() => setActive(null)}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed lg:hidden top-0 left-0 w-full h-full  bg-white z-[100]  px-6  pt-20 pb-10"
          >
            <div  className=" max-w-2xl h-full navscrollbar  overflow-y-auto  mx-auto">

            {/* Header */}
            <div className=" ">
              {activeMobileSection && (
                <button
                className=" flex cursor-pointer items-center pt-4 justify-center gap-2 font-semibold text-sm"
                  onClick={() => {
                    if (activeMobileSubsection !== 0) {
                      setActiveMobileSubsection(0);
                    } else {
                      setActiveMobileSection(null);
                    }
                  }}
                >
                  <IoChevronBack  /> <span>BACK</span>
                </button>
              )}
            </div>

            {/* Menu */}
            {!activeMobileSection ? (
              <ul className="space-y-2 py-4 px-2 sm:px-4 text-sm font-serif">
                {Object.entries(navData).map(([key, items], idx) => (
                  <li key={idx}>
                    {items.length === 1 && !items[0].left ? (
                      <a
                        href={items[0].to}
                        onClick={() => setShowMobileMenu(false)}
                        className="block py-4 px-2 sm:text-lg border-b border-zinc-200"
                      >
                        {key} 
                      </a>
                    ) : (
                      <button
                        className="w-full flex justify-between items-center py-4 px-2 sm:text-lg cursor-pointer border-b border-zinc-200"
                        onClick={() => setActiveMobileSection(key)}
                      >
                        {key}
                        <IoChevronForward />
                      </button>
                    )}
                  </li>
                ))}
                <button className="bg-black text-white text-xs w-[150px] py-4 font-bold hover:bg-zinc-900 my-2 transition">
                  Reservations
                </button>
              </ul>
            ) : isMega(activeMobileSection) ? (
             <NavAccordian navData={navData} activeMobileSection={activeMobileSection} />
            ) : (
              // hotels and resorts
              <ul className="mt-10  font-serif  px-2 sm:px-4">
                {navData[activeMobileSection].map((item, idx) => (
                  <li key={idx} className="sm:text-lg py-4 px-2 border-b border-zinc-200 hover:bg-blue-50 cursor-pointer">
                    <a href={item.to}>{item.label}</a>
                  </li>
                ))}
              </ul>
            )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default   Navbar