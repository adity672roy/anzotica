import { motion } from "framer-motion";

const Heading = ({subHeading,heading,description,buttonText}) => {
  return (
    <section className=" px-4 md:px-10 py-10 my-10">
      <div className="max-w-6xl  mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
        {/* Left - Titles */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2"
        >
          <p className="italic text-lg  mb-2">  {subHeading}</p>
          <h2 className="text-5xl font-serif font-semibold tracking-tight  ">
            {heading}
          </h2>
        </motion.div>

        {/* Right - Description & Button */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:w-1/2"
        >
          <p className=" leading-relaxed mb-6">
           {description}
          </p>

          <button className="border border-white px-6 py-2 hover:bg-white hover:text-black font-semibold  transition duration-500">
           {buttonText}
          </button>
        </motion.div>
      </div>
    </section>
  );
};
export default Heading;
