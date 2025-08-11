import React, { useRef, useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmitWithLoading(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      await handleSumbit(e);
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(e) {
    setQuestion(e.target.value);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }

  return (
    <div className="max-w-[800px] m-auto p-[20px]">
      <form onSubmit={handleSubmitWithLoading}>
        <p className="text-2xl mt-8 mb-4 text-gray-500">{description}</p>
        <textarea
          ref={textareaRef}
          className="w-full p-4
          resize-none
          border-none outline-none 
          placeholder:text-center 
          text-2xl 
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

      {isLoading ? (
        <div className="relative mt-10">
          <div className="absolute -z-10 -inset-2 rounded-xl bg-gradient-to-r from-yellow-500/10 via-teal-500/10 to-sky-500/10 opacity-50 blur-sm"></div>
          <div className="flex items-center justify-center gap-3 p-6 text-gray-500 text-2xl">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span>Gerando resposta...</span>
          </div>
        </div>
      ) : answer ? (
        <>
          <div className="relative">
            <div className="bg-neutral-900 p-10 rounded-3xl mt-12">
              <div className="absolute -z-10 -inset-2 rounded-xl bg-gradient-to-r from-yellow-500/30 via-teal-500/30 to-sky-500/30 opacity-70 blur-lg"></div>
              <h3 className="text-2xl text-gray-500">Resultado:</h3>
              <div className="mt-1 p-4 text-gray-500 rounded whitespace-pre-wrap text-2xl">
                {answer.replace(/^```python|```$/gm, "").trim()}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Home;
