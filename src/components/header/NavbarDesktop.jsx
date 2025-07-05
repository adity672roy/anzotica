import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose, IoChevronForward } from "react-icons/io5";

const NavbarDesktop = ({ navData }) => {
  const [active, setActive] = useState(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const dropdownRef = useRef();

  const isMega = (key) =>
    Array.isArray(navData[key]) && navData[key][0]?.left && navData[key][0]?.right;

  const isSimpleLink = (data) =>
    data.length === 1 && !data[0].left && !data[0].title;

  return (
    <div className="flex justify-between max-w-5xl mx-auto">
      <div className="flex items-center gap-4 text-sm font-medium">
        {Object.entries(navData).map(([key, data]) =>
          isSimpleLink(data) ? (
            <a
              key={key}
              href={data[0].to}
              className={`text-zinc-900 h-full flex items-center text-xs uppercase py-3 hover:text-black hover:border-b-4 hover:border-black ${active === key ? "border-b-4 border-black" : ""}`}
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
              className={`text-zinc-900 h-full text-xs uppercase py-3 hover:text-black hover:border-b-4 hover:border-black ${active === key ? "border-b-4 border-black" : ""}`}
            >
              {key}
            </button>
          )
        )}
      </div>

      <button className=" text-white text-xs w-[150px] py-4 font-bold hover:bg-zinc-700 bg-zinc-900 duration-700 cursor-pointer my-2 transition">
        Reserve Now
      </button>

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
                      className={`text-left flex justify-between items-center p-4 pl-6 font-serif font-medium ${
                        idx === sectionIndex && "text-zinc-800 bg-[#e0e3ec]"
                      }`}
                    >
                      {item.title}
                      {idx === sectionIndex && <IoChevronForward color="#926f29" size={16} />}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col md:flex-row h-full gap-6 md:w-2/3 p-6">
                  <ul className="w-[65%] flex flex-col gap-6 border-r border-zinc-300 pl-12 pt-6 text-xs font-semibold">
                    {navData[active][sectionIndex].left.map((item, idx) => {
                      const label = typeof item === "string" ? item : item.label;
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
                  <li key={idx} className="hover:underline hover:bg-blue-50 p-4">
                    <a href={item.to} className="font-serif text-gray-700" onClick={() => setActive(null)}>
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
  );
};

export default NavbarDesktop;
