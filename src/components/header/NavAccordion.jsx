  
import { IoChevronBack } from "react-icons/io5";
const NavAccordion = ({
  navData,
  activeMobileSection,
  activeMobileSubsection,
  setActiveMobileSubsection,
  setActiveMobileSection,
}) => {
  const section = navData[activeMobileSection]?.[activeMobileSubsection];

  if (!section) return null;

  return (
    <div className="w-full ">
     
      <div className="flex gap-2 px-2  bg-zinc-200 py-6 w-full items-center justify-between mb-4">

      <button
        className=" text-[#927c42] flex cursor-pointer items-center justify-center gap-2 font-semibold  text-sm p-2"
        onClick={() => {
          setActiveMobileSubsection(null);
          setActiveMobileSection(null);
        }}
      >
        <IoChevronBack size={20} />  
      </button>

     
      <h2 className="sm:text-lg text-sm text-center w-full font-medium uppercase tracking-wide   ">
        {section.title}
      </h2>
      </div>

      <div className=" px-4 flex flex-col gap-6">
        <ul className="space-y-2 font-sans font-medium">
          {section.left.map((item, idx) => (
            <li key={idx} className="py-2">
              <a href="#" className="  block">
                {typeof item === "string" ? item : item.label}
              </a>
            </li>
          ))}
        </ul>

        <div>
          <img
            src={section.right.image}
            alt={section.right.title}
            className="w-full h-full object-cover mb-4"
          />
          <p className="text-sm uppercase font-semibold tracking-widest text-zinc-700">
            {section.right.title}
          </p>
          <p className="text-zinc-700 max-w-sm font-serif mt-2 mb-4">
            {section.right.text}
          </p>
          <a href="#" className="inline-block border-b-2 border-black font-medium">
            {section.right.button}
          </a>
        </div>
      </div>
    </div>
  );
};

export default  NavAccordion