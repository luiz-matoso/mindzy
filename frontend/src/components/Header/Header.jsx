import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { initFlowbite } from "flowbite";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import UserDropdown from "../UserDropdown/UserDropdown";
import Logo from "../Logo/Logo";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { authState, logout } = useAuth();

  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-12 max-w-7xl m-auto p-2">
      <nav className="w-full px-4">
        {authState.token ? (
          <UserDropdown />
        ) : (
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex items-center gap-4">
              <button
                onClickCapture={() => navigate("/login")}
                className="sign-in border border-zinc-700 bg-zinc-900 px-8 py-2 rounded-3xl cursor-pointer"
              >
                {t("botoesHeader.fazerLogin")}
              </button>
              <button
                onClickCapture={() => navigate("/signup")}
                className="sign-up px-8 py-2 rounded-3xl cursor-pointer"
              >
                {t("botoesHeader.criarConta")}
              </button>
              <LanguageSelector />
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
