import React from "react";

const Home = ({ question, setQuestion, answer, handleSumbit }) => {
  return (
    <div className="max-w-[600px] m-auto p-[20px]">
      <form onSubmit={handleSumbit}>
        <textarea
          className="w-full p-[20px]
          resize-none
          border-none outline-none 
          placeholder:text-center 
          text-3xl 
          text-center
          bg-transparent
          bg-gradient-to-r from-purple-500 via-teal-500 to-red-500 text-transparent bg-clip-text"
          rows={6}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Digite sua pergunta ou código aqui..."
        />
        <button
          type="submit"
          className="bg-gradient-to-l from-[#06b6d4] via-[#0d9488] to-[#15803d] px-4 py-2 rounded cursor-pointer mt-px-10"
        >
          Enviar
        </button>
      </form>
      {answer && (
        <div
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: "#f4f4f4",
            borderRadius: 4,
            whiteSpace: "pre-wrap",
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
};

export default Home;
