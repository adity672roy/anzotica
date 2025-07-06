import { motion, AnimatePresence } from "framer-motion";
import NavAccordion from "./NavAccordion";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";
import { useState, useEffect } from "react";

const NavbarMobile = ({ showMobileMenu, setShowMobileMenu, navData }) => {
  const [expandedKey, setExpandedKey] = useState(null);
  const [activeMobileSection, setActiveMobileSection] = useState(null);
  const [activeMobileSubsection, setActiveMobileSubsection] = useState(0);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileMenu]);

  const toggleExpand = (key) => {
    setExpandedKey((prev) => (prev === key ? null : key));
  };

  return (
    <AnimatePresence>
      {showMobileMenu && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.6 }}
          className="fixed lg:hidden top-0 left-0 w-full h-full bg-white z-[100] pt-20 pb-10"
        >
          <div className="px-4 max-w-4xl h-full overflow-y-auto mx-auto navscrollbar">
            {!activeMobileSection ? (
              <ul className="space-y-2 text-sm ">
                {Object.entries(navData).map(([key, items], idx) => {
                  const isDropdownOnly =
                    key === "Hotels & Resorts" &&
                    items.every((i) => i.label && i.to);
                  const isMegaMenu = [
                    "About The Ritz-Carlton",
                    "The Journey",
                  ].includes(key);
                  const isSimpleLink =
                    items.length === 1 &&
                    !items[0]?.left &&
                    !items[0]?.links &&
                    !items[0]?.title;

                  return (
                    <li key={idx} className="border-b border-zinc-200">
                      {isDropdownOnly || isMegaMenu ? (
                        <>
                          <button
                            onClick={() => toggleExpand(key)}
                            className="w-full  cursor-pointer flex justify-between items-center py-4 text-base  font-serif px-2 sm:text-lg"
                          >
                            <span>{key}</span>
                            {expandedKey === key ? (
                              <FaChevronUp
                                size={16}
                                className=" text-[#927c42]"
                              />
                            ) : (
                              <FaChevronDown
                                size={16}
                                className=" text-[#927c42]"
                              />
                            )}
                          </button>
                          {expandedKey === key && (
                            <div className="bg-zinc-200 px-2 py-1 sm:px-4 sm:py-2">
                              {isMegaMenu ? (
                                items.map((subItem, subIdx) => (
                                  <button
                                    key={subIdx}
                                    className="w-full flex justify-between items-center py-3 px-2 text-base  font-medium cursor-pointer"
                                    onClick={() => {
                                      setActiveMobileSection(key);
                                      setActiveMobileSubsection(subIdx);
                                    }}
                                  >
                                    {subItem.title}
                                    <IoChevronForward
                                      size={20}
                                      className="text-[#927c42]"
                                    />
                                  </button>
                                ))
                              ) : (
                                <ul className=" text-base w-full font-medium  px-2 py-1">
                                  {items.map((item, i) => (
                                    <a
                                      href={item.to}
                                      key={i}
                                      className="block py-2"
                                      onClick={() => setShowMobileMenu(false)}
                                    >
                                      {item.label}
                                    </a>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                        </>
                      ) : isSimpleLink ? (
                        <a
                          href={items[0].to}
                          onClick={() => setShowMobileMenu(false)}
                          className="block py-4 px-2 sm:text-lg text-base  font-serif"
                        >
                          {key}
                        </a>
                      ) : null}
                    </li>
                  );
                })}
                <button className="text-white text-xs w-[150px] py-4 font-bold cursor-pointer hover:bg-zinc-700 bg-zinc-900 duration-700 my-2 transition">
                  Reserve Now
                </button>
              </ul>
            ) : (
              <NavAccordion
                navData={navData}
                activeMobileSection={activeMobileSection}
                activeMobileSubsection={activeMobileSubsection}
                setActiveMobileSubsection={setActiveMobileSubsection}
                setActiveMobileSection={setActiveMobileSection}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavbarMobile;
