import React from "react";

const subcategoriesByCategory = {
  "Para estudantes": ["Flashcards", "Resumo", "Explicação"],
  Tecnologia: ["Explicar código", "Criar código"],
  Diversão: ["Piadas", "Curiosidades"],
};

const newBadges = [
  "Explicação",
  "Explicar código",
  "Criar código",
  "Piadas",
  "Curiosidades",
];

const SubCategorySelector = ({
  category,
  selectedSubcategory,
  onSelectSubcategory,
}) => {
  const subcategories = subcategoriesByCategory[category] || [];

  return (
    <div className="flex justify-center gap-4 mt-[-20px]">
      {subcategories.map((subcat) => (
        <div key={subcat} className="relative">
          {selectedSubcategory === subcat && (
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-600 via-teal-600 to-sky-600 opacity-75 blur-2xl cursor-pointer"></div>
          )}
          <button
            key={subcat}
            onClick={() => onSelectSubcategory(subcat)}
            className={`px-6 py-2 rounded-3xl cursor-pointer ${
              selectedSubcategory === subcat
                ? "gradient-swap-button-options text-white"
                : "text-white border border-zinc-700"
            }`}
          >
            <span className="relative z-10">{subcat}</span>
          </button>
          {newBadges.includes(subcat) && (
            <span className="absolute -top-2 -right-3 bg-gradient-to-r from-[#fde68a]  to-[#f59e0b] text-black text-xs font-sm px-2.5 py-0.5 rounded-xl">
              NEW
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubCategorySelector;
