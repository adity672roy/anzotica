import { motion } from "framer-motion";

const Heading = ({  subHeading,
  heading,
  description,
  buttonText,
  borderColor = "white",
  bgColor = "white", }) => {
  return (
    <section className="w-full sm:px-4 px-2 md:px-10 md:py-10 pt-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className={`${
            description || buttonText ? "md:w-[55%] w-full" : "w-full"
          }`}
        >
          <p className="italic md:text-3xl text-xl sm:text-2xl font-serif mb-2">
            {subHeading}
          </p>
          <h2 className="md:text-6xl text-4xl sm:text-5xl w-full font-serif font-extralight uppercase">
            {heading}
          </h2>
        </motion.div>

        {(description || buttonText) && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-[45%] w-full"
          >
            {description && (
              <p className="font-serif font-light leading-relaxed mb-6">
                {description}
              </p>
            )}
            {buttonText && (
             <button
                className={`border text-xs font-medium cursor-pointer px-8 py-3.5 transition duration-1000`}
                style={{
                  borderColor,
                  color: borderColor,
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = bgColor;
                  e.target.style.color = bgColor === "white" ? "black" : "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = borderColor;
                }}
              >
                {buttonText}
              </button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};
export default Heading;
