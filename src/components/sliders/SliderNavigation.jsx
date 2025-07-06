
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const SliderNavigation = ({ current, total, progress, onPrev, onNext }) => {
  return (
    <div className="md:max-w-md max-w-2xs mx-auto flex flex-col items-center justify-center mt-8">
      <div className="w-full flex items-center justify-between">
        <button
          onClick={onPrev}
          className="flex items-center gap-1 cursor-pointer text-sm text-neutral-600"
        >
          <IoChevronBack size={18} />
          <span className="hidden md:inline-block">Previous</span>
        </button>

        <div className="w-full mx-2 relative h-1  bg-gray-300 overflow-hidden">
          <div
            className="h-full bg-[#8B6A29] transition-all duration-500 ease-linear"
            style={{ width: `${progress}%` }}
           
          />
        </div>

        <button
          onClick={onNext}
          className="flex items-center gap-1 cursor-pointer text-sm text-neutral-600"
        >
          <span className="hidden md:inline-block">Next</span>
          <IoChevronForward size={18} />
        </button>
      </div>

      <p className="text-center text-sm text-gray-500 mt-2">
        {current} / {total}
      </p>
    </div>
  );
};

export default SliderNavigation;
