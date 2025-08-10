import { useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Para estudantes");

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
      <Header selected={selectedCategory} onSelect={setSelectedCategory} />
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
