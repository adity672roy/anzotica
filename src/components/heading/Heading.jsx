import { motion } from "framer-motion";
import Button from '../button/Button'

const Heading = ({  subHeading,
  heading,
  description,
  buttonText,
  borderColor = "white",
  bgColor = "white", }) => {
  return (
    <section className="w-full px-4 md:px-10 md:py-10 pt-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start overflow-hidden justify-between gap-4">
       
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6,ease : "linear" }}
          viewport={{ once: true }}
          className={` ${ 
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
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2,ease : "linear" }}
            className="md:w-[45%]  w-full"
          >
            {description && (
              <p className="font-serif text-base font-light leading-relaxed mb-6">
                {description}
              </p>
            )}
            {buttonText && (
            <Button text={buttonText} variant="custom" borderColor={borderColor }bgColor={bgColor} />
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};
export default Heading;
