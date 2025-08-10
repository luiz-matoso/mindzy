import React, { useRef } from "react";

const Home = ({
  question,
  setQuestion,
  answer,
  handleSumbit,
  placeholder,
  description,
  buttonText,
}) => {
  const textareaRef = useRef(null);

  function handleChange(e) {
    setQuestion(e.target.value);

    textareaRef.current.style.height = "auto";

    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }

  return (
    <div className="max-w-[800px] m-auto p-[20px]">
      <form onSubmit={handleSumbit}>
        <p>{description}</p>
        <textarea
          ref={textareaRef}
          className="w-full p-4
          resize-none
          border-none outline-none 
          placeholder:text-center 
          text-3xl 
          text-center
          bg-transparent
          bg-gradient-to-r from-purple-500 via-teal-500 to-red-500 text-transparent bg-clip-text
          min-h-[40px]
          max-h-[300px]
          overflow-y-auto"
          rows={1}
          value={question}
          onChange={handleChange}
          placeholder={placeholder}
        />

        <div className="relative inline-block">
          <div className="mt-5 absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-500 via-teal-500 to-sky-500 opacity-40 blur-2xl"></div>
          <button
            type="submit"
            className="relative bg-gradient-to-l from-[#06b6d4] via-[#0d9488] to-[#15803d] px-4 py-2 rounded-3xl cursor-pointer mt-5 text-white text-2xl"
          >
            {buttonText}
          </button>
        </div>
      </form>
      <h3 className="mt-5 text-3xl">Sua resposta:</h3>
      {/* {answer && ( */}
      <div className="mt-5 p-4 bg-white rounded whitespace-pre-wrap text-2xl">
        O código é um sistema de respostas curtas que determina o sinal do
        número. Se o número é positivo, ele printará "O número é positivo.". Se
        o número é zero, ele printará "O número é zero.". Se o número é
        negativo, ele printará "O número é negativo.
      </div>
      {/* )} */}
    </div>
  );
};

export default Home;
