import { useEffect, useState } from "react";
import "./App.css";
import Mindzy from "./components/Mindzy/Mindzy";
import Header from "./components/Header/Header";
import config from "./utils/config";

import {
  explainCode,
  generateFlashcards,
  summarizeText,
  explainSubject,
  createCode,
  generateJokes,
  generateCuriosities,
} from "./api/aiService";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import { Flip, ToastContainer } from "react-toastify";
import Register from "./components/Register/Register";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Para estudantes");
  const [selectedSubcategory, setSelectedSubCategory] = useState("Flashcards");

  const [placeholder, setPlaceholder] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("");

  function updateTexts(category, subcategory) {
    const categoryData = config[category];
    if (categoryData) {
      const subcatData = categoryData[subcategory];
      if (subcatData) {
        setPlaceholder(subcatData.placeholder);
        setDescription(subcatData.description);
        setButtonText(subcatData.buttonText);
      }
    }
  }

  useEffect(() => {
    updateTexts(selectedCategory, selectedSubcategory);
  }, [selectedCategory, selectedSubcategory]);

  function handleCategoryChange(newCategory) {
    setSelectedCategory(newCategory);

    const firstSubcat = {
      "Para estudantes": "Flashcards",
      Tecnologia: "Explicar código",
      Diversão: "Piadas",
    }[newCategory];

    setSelectedSubCategory(firstSubcat);
  }

  async function handleSumbit(e) {
    e.preventDefault();
    console.log("handleSumbit chamado");
    if (!question.trim()) return;

    try {
      let data;

      if (selectedCategory === "Para estudantes") {
        if (selectedSubcategory === "Flashcards") {
          data = await generateFlashcards(question);
        } else if (selectedSubcategory === "Resumo") {
          data = await summarizeText(question);
        } else if (selectedSubcategory === "Explicação") {
          data = await explainSubject(question);
        }
      } else if (selectedCategory === "Tecnologia") {
        if (selectedSubcategory === "Explicar código") {
          data = await explainCode(question);
        } else if (selectedSubcategory === "Criar código") {
          data = await createCode(question);
        }
      } else if (selectedCategory === "Diversão") {
        if (selectedSubcategory === "Piadas") {
          data = await generateJokes(question);
        } else if (selectedSubcategory === "Curiosidades") {
          data = await generateCuriosities(question);
        }
      }
      setAnswer(data.response);
    } catch (error) {
      console.error("API call failed:", error);
    }
  }

  return (
    <>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Flip}
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route
            path="/"
            element={
              <>
                <Header
                  selected={selectedCategory}
                  onSelect={handleCategoryChange}
                />
                <Mindzy
                  question={question}
                  setQuestion={setQuestion}
                  answer={answer}
                  handleSumbit={handleSumbit}
                  placeholder={placeholder}
                  description={description}
                  buttonText={buttonText}
                  selected={selectedCategory}
                  onSelect={handleCategoryChange}
                  category={selectedCategory}
                  selectedSubcategory={selectedSubcategory}
                  onSelectSubcategory={setSelectedSubCategory}
                />
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
