import { useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import SubCategorySelector from "./components/Header/SubCategorySelector";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Para estudantes");
  const [selectedSubcategory, setSelectedSubCategory] = useState("Flashcards");

  function handleCategoryChange(newCategory) {
    setSelectedCategory(newCategory);

    const firstSubcat = {
      "Para estudantes": "Flashcards",
      Tecnologia: "Debugging",
      Diversão: "Memes",
    }[newCategory];

    setSelectedSubCategory(firstSubcat);
  }

  async function handleSumbit(e) {
    e.preventDefault();
    if (!question.trim()) return;

    const response = await fetch("http://localhost:8080/explainCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    setAnswer(data.response);
  }

  return (
    <>
      <Header selected={selectedCategory} onSelect={handleCategoryChange} />

      <SubCategorySelector
        category={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onSelectSubcategory={setSelectedSubCategory}
      />
      <Home
        question={question}
        setQuestion={setQuestion}
        answer={answer}
        handleSumbit={handleSumbit}
      />
    </>
  );
}

export default App;
