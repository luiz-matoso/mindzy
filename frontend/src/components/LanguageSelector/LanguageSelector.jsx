import React, { useEffect, useState } from "react"; // 1. Adicione useState e useEffect
import { useTranslation } from "react-i18next";

const BrazilFlag = () => (
  <svg
    aria-hidden="true"
    className="h-3.5 w-3.5 rounded-sm me-2"
    viewBox="0 0 20 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="20" height="14" fill="#009B3A" />
    <path d="M10 2L18 7L10 12L2 7L10 2Z" fill="#FFCC29" />
    <circle cx="10" cy="7" r="2.5" fill="#002776" />
  </svg>
);

const UsaFlag = () => (
  <svg
    aria-hidden="true"
    className="h-3.5 w-3.5 rounded-sm me-2"
    viewBox="0 0 21 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        fill="#B22234"
        d="M0 0h21v1.4H0zm0 2.8h21v1.4H0zm0 2.8h21v1.4H0zm0 2.8h21v1.4H0zm0 2.8h21v1.4H0z"
      />
      <path
        fill="#FFF"
        d="M0 1.4h21v1.4H0zm0 2.8h21v1.4H0zm0 2.8h21v1.4H0zm0 2.8h21v1.4H0z"
      />
      <path fill="#3C3B6E" d="M0 0h9.8v8.4H0z" />
    </g>
  </svg>
);

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const [activeLanguageCode, setActiveLanguageCode] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setActiveLanguageCode(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  const languages = [
    { code: "pt", name: "Português", flag: <BrazilFlag /> },
    { code: "en", name: "English", flag: <UsaFlag /> },
  ];

  const currentLanguage =
    languages.find((lang) => activeLanguageCode.startsWith(lang.code)) ||
    languages[0];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button
        id="states-button"
        data-dropdown-toggle="dropdown-states"
        className="shrink-0 cursor-pointer z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700"
        type="button"
      >
        {currentLanguage.flag}
        {currentLanguage.name}
        <svg
          className="w-2.5 h-2.5 ms-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown-states"
        className="z-10 hidden bg-zinc-800 divide-y divide-gray-100 rounded-lg shadow-sm w-44"
      >
        <ul className="py-2 text-sm text-white" aria-labelledby="states-button">
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 text-sm text-white bg-zinc-800 hover:bg-zinc-700 cursor-pointer"
                onClick={() => changeLanguage(lang.code)}
              >
                <div className="inline-flex items-center">
                  {lang.flag}
                  {lang.name}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageSelector;
