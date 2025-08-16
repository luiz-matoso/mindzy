import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ selected, onSelect }) => {
  const navigate = useNavigate();
  const options = ["Para estudantes", "Tecnologia", "Diversão"];
  const newBadges = ["Tecnologia", "Diversão"];

  return (
    <div className="flex flex-col items-center gap-6 py-12 max-w-7xl m-auto p-2">
      <nav className="w-full px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-5xl bg-gradient-to-r from-purple-500 via-teal-500 to-red-500 text-transparent bg-clip-text p-4 pl-12 animate-gradient">
            Mindzy
          </h2>
          <div className="flex gap-4">
            <button
              onClickCapture={() => navigate("/login")}
              className="sign-in border border-zinc-700 bg-zinc-900 px-8 py-2 rounded-3xl cursor-pointer"
            >
              Sign In
            </button>
            <button className="sign-up px-8 py-2 rounded-3xl cursor-pointer">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <div className="flex gap-6">
        {options.map((option) => (
          <div key={option} className="relative">
            {selected === option && (
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-600 via-teal-600 to-sky-600 opacity-75 blur-2xl"></div>
            )}
            <button
              onClick={() => onSelect(option)}
              className={`relative px-8 py-2 rounded-3xl cursor-pointer transition-all ${
                selected === option
                  ? "bg-gradient-to-l from-[#06b6d4] via-[#0d9488] to-[#15803d] text-white"
                  : "text-white border border-zinc-700 bg-zinc-900"
              }`}
            >
              {option}
              {newBadges.includes(option) && (
                <span className="absolute -top-2 bg-gradient-to-r from-[#fde68a]  to-[#f59e0b] text-black text-xs font-sm px-2.5 py-0.5 rounded-xl">
                  NEW
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
