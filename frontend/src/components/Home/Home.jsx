import React from "react";

const Home = ({ onScrollClick }) => {
  return (
    <section>
      <div class="py-8 px-2 mx-auto max-w-screen-xl text-center lg:py-30 lg:px-12">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Desbloqueie o poder da sua mente com Inteligência Artificial
        </h1>
        <p class="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">
          Do estudante que precisa de resumos instantâneos ao programador que
          busca otimizar um código, Mindzy é o seu copiloto para tarefas
          complexas. Gere flashcards, explique algoritmos ou simplesmente
          explore a criatividade com ideias geradas na hora. Simplifique o
          complexo, acelere seus resultados.
        </p>
        <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            onClick={onScrollClick}
            class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg animate-gradient-button cursor-pointer"
          >
            Usar Mindzy
            <svg
              class="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Conhecer sobre
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
