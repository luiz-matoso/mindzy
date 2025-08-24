import { useEffect, useRef, useState } from "react";
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
import Home from "./components/Home/Home";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("estudantes");
  const [selectedSubcategory, setSelectedSubCategory] = useState("Flashcards");

  const [placeholder, setPlaceholder] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("");

  const mindzyRef = useRef(null);

  const handleScrollToMindzy = () => {
    mindzyRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function updateTexts(categoryKey, subcategoryText) {
    const placeholderText = t(
      `mindzy.textConfig.${categoryKey}.${subcategoryText}.placeholder`
    );
    const descriptionText = t(
      `mindzy.textConfig.${categoryKey}.${subcategoryText}.description`
    );
    const buttonTextValue = t(
      `mindzy.textConfig.${categoryKey}.${subcategoryText}.buttonText`
    );

    setPlaceholder(placeholderText);
    setDescription(descriptionText);
    setButtonText(buttonTextValue);
  }

  useEffect(() => {
    updateTexts(selectedCategory, selectedSubcategory);
  }, [selectedCategory, selectedSubcategory, t]);

  function handleCategoryChange(newCategoryKey) {
    setSelectedCategory(newCategoryKey);

    const subcategoriesForNewCategory = t(
      `mindzy.subcategorias.${newCategoryKey}`,
      { returnObjects: true }
    );
    const firstSubcat = subcategoriesForNewCategory[0];

    setSelectedSubCategory(firstSubcat);
  }
  async function handleSumbit(e) {
    e.preventDefault();
    if (!question.trim()) return;

    try {
      let data;
      const subcatEstudantes = t("mindzy.subcategorias.estudantes", {
        returnObjects: true,
      });
      const subcatTecnologia = t("mindzy.subcategorias.tecnologia", {
        returnObjects: true,
      });
      const subcatDiversao = t("mindzy.subcategorias.diversao", {
        returnObjects: true,
      });

      if (selectedCategory === "estudantes") {
        if (selectedSubcategory === subcatEstudantes[0]) {
          // Flashcards
          data = await generateFlashcards(question);
        } else if (selectedSubcategory === subcatEstudantes[1]) {
          // Resumo
          data = await summarizeText(question);
        } else if (selectedSubcategory === subcatEstudantes[2]) {
          // Explicação
          data = await explainSubject(question);
        }
      } else if (selectedCategory === "tecnologia") {
        if (selectedSubcategory === subcatTecnologia[0]) {
          // Explicar código
          data = await explainCode(question);
        } else if (selectedSubcategory === subcatTecnologia[1]) {
          // Criar código
          data = await createCode(question);
        }
      } else if (selectedCategory === "diversao") {
        if (selectedSubcategory === subcatDiversao[0]) {
          // Piadas
          data = await generateJokes(question);
        } else if (selectedSubcategory === subcatDiversao[1]) {
          // Curiosidades
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
                <Home onScrollClick={handleScrollToMindzy} />
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
                  ref={mindzyRef}
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
