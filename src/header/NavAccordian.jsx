import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const NavAccordion = ({ navData, activeMobileSection }) =>{
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {navData[activeMobileSection].length > 1 && (
        <ul className="pt-6 md:pt-10 sm:px-4 px-2   font-serif">
          {navData[activeMobileSection].map((subItem, subIdx) => (
            <li key={subIdx} className="mb-1">
              <button
                onClick={() => toggleSection(subIdx)}
                className={`w-full bg-zinc-900 sm:text-lg text-white px-4 flex items-center justify-between py-2 sm:py-4 text-left ${
                  subIdx === openIndex ? "font-semibold bg-[#f5f6f9]" : ""
                }`}
              >
                {subItem.title}
                {subIdx === openIndex ? (
                  <FaChevronUp className="ml-2 text-xs" />
                ) : (
                  <FaChevronDown className="ml-2 text-xs" />
                )}
              </button>

              {/* Accordion Content */}
              {subIdx === openIndex && (
                <div className="pl-2 pt-2">
                  <ul className="space-y-2 pb-4 font-sans font-medium">
                    {subItem.left.map((item, idx) => (
                      <li key={idx} className="py-1 text-center">
                        <a href="#" className="hover:underline  block">
                          {typeof item === "string" ? item : item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="pb-4">
                    <img
                      src={subItem.right.image}
                      alt="Promo"
                      className="h-[300px] w-full object-cover mb-3"
                    />
<div className="flex gap-2 flex-col items-center justify-center w-full">

                    <p className="text-sm  font-sans tracking-widest font-semibold uppercase  text-zinc-700 ">
                      {subItem.right.title}
                    </p>
                    <p className="max-w-sm  text-center  font-serif text-zinc-700 ">
                      {subItem.right.text}
                    </p>
                     
                    <a
                      href="#"
                      className="inline-block  font-sans px-2 py-1  border-b-2 border-black font-medium  "
                    >
                      {subItem.right.button}
                    </a>
</div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default  NavAccordion