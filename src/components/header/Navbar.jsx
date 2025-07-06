import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { FaEarthAmericas, FaRegUser } from "react-icons/fa6";
import { navData } from "./data";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import Button from "../button/Button";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="max-lg:sticky max-lg:top-0 max-lg:shadow bg-white px-4 sm:px-6 z-[999]">
        <div className="max-w-6xl mx-auto border-b border-gray-50/5 py-3 flex justify-between items-center">
          <div className="flex items-center sm:gap-4 gap-2">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden cursor-pointer"
            >
              {showMobileMenu ? <IoClose size={24} /> : <IoIosMenu size={20} />}
            </button>
            <a
              href="/"
              className="font-serif sm:text-sm text-xs font-semibold uppercase tracking-wide"
            >
              THE RITZ-CARLTON
            </a>
          </div>

          <div className="flex items-center gap-4 md:gap-6  font-medium text-gray-800">
            <div className="flex items-center space-x-1 hover:text-black cursor-pointer">
              <FaEarthAmericas />
              <span className="max-lg:hidden">English</span>
            </div>
           <Button text="Sign in or Join" variant="outline" />

            <button className="lg:hidden py-2 cursor-pointer">
              <FaRegUser />
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Nav */}
      <div
        className={`hidden lg:block sticky px-6 top-0 z-40 shadow-md transition-colors duration-300 ${
          scrolled ? "bg-[#ffffffe6]" : "bg-white"
        }`}
      >
        <NavbarDesktop navData={navData} />
      </div>

      {/* Mobile Nav */}
      <NavbarMobile
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
        navData={navData}
      />
    </>
  );
};

export default Navbar;
