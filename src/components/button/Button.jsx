const Button = ({
  text,
  variant = "solid", 
  borderColor = "#000",
  bgColor = "#000",
  className = "",
  onClick,
}) => {
  if (variant === "custom") {
    return (
      <button
        className={`border text-sm font-medium px-8 py-3.5 cursor-pointer transition duration-700 ${className}`}
        style={{ borderColor, color: borderColor }}
        onClick={onClick}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = bgColor;
          e.target.style.color = bgColor === "white" ? "black" : "white";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "transparent";
          e.target.style.color = borderColor;
        }}
      >
        {text}
      </button>
    );
  }

  const base = `text-xs font-bold cursor-pointer xl:w-[170px] w-[150px] transition duration-700 ${className}`;

  if (variant === "outline") {
    return (
      <button
        className={`hidden lg:block border border-zinc-900 py-4 hover:bg-zinc-900 hover:text-white ${base}`}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }

  return (
    <button
      className={`bg-zinc-900 text-white py-5 my-2 hover:bg-zinc-700 ${base}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
