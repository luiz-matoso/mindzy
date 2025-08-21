import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = ({ selected, onSelect }) => {
  const navigate = useNavigate();
  const options = ["Para estudantes", "Tecnologia", "Diversão"];
  const newBadges = ["Tecnologia", "Diversão"];

  const { authState, logout } = useAuth();

  return (
    <div className="flex flex-col items-center gap-6 py-12 max-w-7xl m-auto p-2">
      <nav className="w-full px-4">
        {authState.token ? (
          <div className="flex justify-between items-center">
            <h2 className="text-5xl bg-gradient-to-r from-purple-500 via-teal-500 to-red-500 text-transparent bg-clip-text p-4 animate-gradient">
              Mindzy
            </h2>
            <div className="flex gap-4">
              <button
                id="dropdownAvatarNameButton"
                data-dropdown-toggle="dropdownAvatarName"
                className="cursor-pointer flex items-center text-sm pe-1 font-medium text-white rounded-full profile-gradient"
                type="button"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 me-2 rounded-full"
                  src="https://www.citypng.com/public/uploads/preview/white-user-member-guest-icon-png-image-701751695037005zdurfaim0y.png"
                  alt="user photo"
                />
                Olá, {authState.user.username}!
                <svg
                  className="w-2.5 h-2.5 ms-3 group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="dropdownAvatarName"
                className="z-10 hidden bg-neutral-800 divide-y divide-gray-100 rounded-lg shadow-sm w-54"
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div className="font-medium ">{authState.user.username}</div>
                  <div className="truncate">{authState.user.email}</div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-200"
                  aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-neutral-600"
                    >
                      Perfil
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-neutral-600"
                    >
                      Configurações
                    </a>
                  </li>
                </ul>
                <div className="py-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-white hover:bg-neutral-600"
                    onClick={logout}
                  >
                    Desconectar
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <h2 className="text-5xl bg-gradient-to-r from-purple-500 via-teal-500 to-red-500 text-transparent bg-clip-text p-4 animate-gradient">
              Mindzy
            </h2>
            <div className="flex gap-4">
              <button
                onClickCapture={() => navigate("/login")}
                className="sign-in border border-zinc-700 bg-zinc-900 px-8 py-2 rounded-3xl cursor-pointer"
              >
                Login
              </button>
              <button
                onClickCapture={() => navigate("/signup")}
                className="sign-up px-8 py-2 rounded-3xl cursor-pointer"
              >
                Cadastro
              </button>
            </div>
          </div>
        )}
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
