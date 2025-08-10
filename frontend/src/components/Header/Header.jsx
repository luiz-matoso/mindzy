import React from "react";

const Header = ({ selected, onSelect }) => {
  const options = ["Para estudantes", "Tecnologia", "Diversão"];

  return (
    <div className="flex justify-center gap-6 py-4">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`px-8 py-2 rounded-3xl cursor-pointer ${
            selected === option
              ? "bg-gradient-to-l from-[#06b6d4] via-[#0d9488] to-[#15803d] text-white"
              : "text-white border border-zinc-700"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Header;
