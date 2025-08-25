import { forwardRef, useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Mindzy = forwardRef(
  (
    {
      question,
      setQuestion,
      answer,
      handleSumbit,
      placeholder,
      description,
      buttonText,
      selected,
      category,
      selectedSubcategory,
      onSelectSubcategory,
      onSelect,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const textareaRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const categoryKeys = ["estudantes", "tecnologia", "diversao"];

    const onlyAuthenticatedKeys = ["tecnologia", "diversao"];

    const newBadgesCategoryKeys = ["tecnologia", "diversao"];

    const subcategoriesData = t("mindzy.subcategorias", {
      returnObjects: true,
    });

    const subcategories = subcategoriesData[category] || [];
    const { authState } = useAuth();

    const isLoggedIn = authState.token;

    useEffect(() => {
      setQuestion("");
      if (textareaRef.current) {
        textareaRef.current.focus({ preventScroll: true });
      }
    }, [placeholder]);

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
      <div ref={ref} className="max-w-[800px] m-auto p-[20px] py-60">
        <div className="flex flex-col items-center gap-6 py-12 max-w-7xl m-auto p-2">
          <h2 className="text-5xl p-4 animated-gradient-mindzy cursor-pointer">
            Mindzy
          </h2>
          <div className="flex gap-6">
            {categoryKeys.map((key) => (
              <div key={key} className="relative">
                {selected === key && (
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-600 via-teal-600 to-sky-600 opacity-75 blur-2xl"></div>
                )}
                <button
                  onClick={() => onSelect(key)}
                  className={`relative px-8 py-2 rounded-3xl cursor-pointer transition-all ${
                    selected === key
                      ? "gradient-swap-button-options text-white"
                      : "text-white border border-zinc-700 bg-zinc-900 hover:bg-zinc-700 duration-400 transition-colors"
                  }`}
                >
                  <span className="relative z-10">
                    {t(`mindzy.categorias.${key}`)}
                  </span>
                </button>
                {newBadgesCategoryKeys.includes(key) && (
                  <span className="absolute -top-2 -right-3 z-20 bg-gradient-to-r from-[#fde68a]  to-[#f59e0b] text-black text-xs font-sm px-2.5 py-0.5 rounded-xl">
                    {t("mindzy.novo")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

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
              {newBadgesCategoryKeys.includes(subcat) && (
                <span className="absolute -top-2 -right-3 bg-gradient-to-r from-[#fde68a]  to-[#f59e0b] text-black text-xs font-sm px-2.5 py-0.5 rounded-xl">
                  NOVO
                </span>
              )}
            </div>
          ))}
        </div>
        {!onlyAuthenticatedKeys.includes(selected) || isLoggedIn ? (
          <form onSubmit={handleSubmitWithLoading}>
            <p className="text-2xl text-center mt-8 mb-4 text-gray-400">
              {description}
            </p>
            <div className="bg-neutral-900 rounded-3xl">
              <textarea
                ref={textareaRef}
                className="w-full p-4 resize-none border-none outline-none placeholder:text-center text-2xl text-center bg-gradient-to-r from-purple-500 via-teal-500 to-red-500 text-transparent bg-clip-text min-h-[40px] max-h-[300px] overflow-y-auto"
                rows={1}
                value={question}
                onChange={handleChange}
                placeholder={placeholder}
              />
            </div>

            <div className="flex justify-center">
              <div className="relative inline-block text-center">
                <div className="mt-5 absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-500 via-teal-500 to-sky-500 opacity-40 blur-xl"></div>
                <button
                  type="submit"
                  className="relative bg-gradient-to-l from-[#06b6d4] via-[#0d9488] to-[#15803d] px-4 py-2 rounded-3xl cursor-pointer mt-5 text-white text-2xl"
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center mt-20 p-8 bg-neutral-900 rounded-xl border border-zinc-800">
            <h2 className="text-3xl text-white font-bold mb-4">
              {t("mindzy.acessoBloqueado")}
            </h2>
            <div className="flex justify-center m-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="size-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>

            <p className="text-lg text-gray-400 mb-6">
              Você precisa estar autenticado para usar a categoria "{selected}".
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-2 border border-zinc-700 bg-zinc-800 text-white rounded-3xl hover:bg-zinc-700 transition-colors"
              >
                {t("botoesHeader.fazerLogin")}
              </Link>
              <Link
                to="/signup"
                className="px-8 py-2 sign-up text-white rounded-3xl"
              >
                {t("botoesHeader.criarConta")}
              </Link>
            </div>
          </div>
        )}

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
              <span>{t("mindzy.gerandoResposta")}</span>
            </div>
          </div>
        ) : answer ? (
          <>
            <div className="relative">
              <div className="bg-neutral-900 p-10 rounded-3xl mt-12">
                <div className="absolute -z-10 -inset-2 rounded-xl bg-gradient-to-r from-yellow-500/30 via-teal-500/30 to-sky-500/30 opacity-70 blur-lg"></div>
                <h3 className="text-2xl text-gray-500">
                  {t("mindzy.resultado")}
                </h3>
                <div className="mt-1 p-4 text-gray-500 rounded whitespace-pre-wrap text-2xl">
                  {answer.replace(/^```python|```$/gm, "").trim()}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  }
);

export default Mindzy;
