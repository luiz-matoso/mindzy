import React from "react";

const subcategoriesByCategory = {
  "Para estudantes": ["Flashcards", "Resumo", "Explicação"],
  Tecnologia: ["Explicar código", "Criar código"],
  Diversão: ["Piadas", "Curiosidades"],
};

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
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-600 via-teal-600 to-sky-600 opacity-75 blur-2xl"></div>
          )}
          <button
            key={subcat}
            onClick={() => onSelectSubcategory(subcat)}
            className={`px-6 py-2 rounded-3xl cursor-pointer ${
              selectedSubcategory === subcat
                ? "bg-gradient-to-l from-[#06b6d4] via-[#0d9488] to-[#15803d] text-white"
                : "text-white border border-zinc-700"
            }`}
          >
            {subcat}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SubCategorySelector;
