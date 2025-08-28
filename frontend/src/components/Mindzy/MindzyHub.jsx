import { useState } from "react";
import Mindzy from "./Mindzy";

const MindzyHub = () => {
  const [activeApp, setActiveApp] = useState("education");

  const appData = {
    education: {
      options: [
        {
          id: "topic",
          label: "Estudar Tópico",
          type: "text",
          placeholder: "Sobre o que você quer aprender?",
          description:
            "Basta digitar um tema, conceito ou pergunta. Vou gerar um guia de estudos completo, com resumos e pontos-chave, para acelerar seu aprendizado.",
        },
        {
          id: "file",
          label: "Estudar PDF",
          type: "file",
          description:
            "Envie seu material de aula em PDF e eu o transformarei em um resumo inteligente, destacando os pontos mais importantes para otimizar seus estudos.",
        },
      ],
    },
    tech: {
      options: [
        {
          id: "explain_code",
          label: "Explicar Código",
          type: "text",
          placeholder: "Cole o trecho de código aqui...",
          description:
            "Cole qualquer trecho de código e eu o analisarei, explicando a lógica, a função de cada parte e possíveis melhorias. Ideal para aprender e depurar.",
        },
        {
          id: "analyze_py",
          label: "Analisar Arquivo .py",
          type: "file",
          description:
            "Faça o upload de um arquivo de código em Python para uma análise completa. Vou explicar a estrutura geral, a função de cada classe ou método e sugerir otimizações.",
        },
      ],
    },
  };

  const AppSelector = ({ appKey, label, isActive, onClick }) => {
    const badgeStyles = {
      education: "bg-neutral-800 text-sky-200",
      tech: "bg-neutral-800 text-purple-300",
    };

    const gradientStyles = {
      education: "animated-gradient-education",
      tech: "animated-gradient-tech",
    };

    return (
      <div
        onClick={onClick}
        className={`relative p-4 cursor-pointer transition-opacity ${
          isActive ? "opacity-100" : "opacity-40 hover:opacity-75"
        }`}
      >
        <h2
          className={`text-5xl select-none ${
            gradientStyles[appKey] || "animate-gradient"
          }`}
        >
          Mindzy
        </h2>
        <span
          className={`absolute top-2 -right-6 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl ${
            badgeStyles[appKey] || "bg-gray-700 text-gray-300"
          }`}
        >
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[800px] m-auto p-4">
      <div className="flex justify-center items-center gap-8">
        <AppSelector
          appKey="education"
          label=".edu"
          isActive={activeApp === "education"}
          onClick={() => setActiveApp("education")}
        />
        <AppSelector
          appKey="tech"
          label=".tech"
          isActive={activeApp === "tech"}
          onClick={() => setActiveApp("tech")}
        />
      </div>

      <Mindzy key={activeApp} options={appData[activeApp].options} />
    </div>
  );
};

export default MindzyHub;
