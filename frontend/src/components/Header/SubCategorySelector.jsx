import React from "react";

const subcategoriesByCategory = {
  "Para estudantes": ["Flashcards", "Resumo", "Explicação"],
  Tecnologia: ["Explicar código", "Criar código"],
  Diversão: ["Memes", "Jogos", "Curiosidades"],
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
      ))}
    </div>
  );
};

export default SubCategorySelector;
