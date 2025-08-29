import { useEffect, useState } from "react";
import Mindzy from "./Mindzy";
import { analyzeDoc, explainTopic } from "../../api/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const MindzyHub = () => {
  const { t } = useTranslation();

  const [activeApp, setActiveApp] = useState("education");

  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const appData = {
    education: {
      options: [
        {
          id: "topic",
          label: t("mindzyHub.education.topic.label"),
          type: "text",
          placeholder: t("mindzyHub.education.topic.placeholder"),
          description: t("mindzyHub.education.topic.description"),
          api: explainTopic,
        },
        {
          id: "file",
          label: t("mindzyHub.education.file.label"),
          type: "file",
          description: t("mindzyHub.education.file.description"),
          api: analyzeDoc,
        },
      ],
    },
    tech: {
      options: [
        {
          id: "explain_code",
          label: t("mindzyHub.tech.explain_code.label"),
          type: "text",
          placeholder: t("mindzyHub.tech.explain_code.placeholder"),
          description: t("mindzyHub.tech.explain_code.description"),
        },
        {
          id: "analyze_py",
          label: t("mindzyHub.tech.analyze_py.label"),
          type: "file",
          description: t("mindzyHub.tech.analyze_py.description"),
        },
      ],
    },
  };

  useEffect(() => {
    if (appData[activeApp]) {
      setSelectedOption(appData[activeApp].options[0]);
    }
  }, [activeApp, t]);

  async function handleSubmit(payload) {
    setIsLoading(true);
    setAnswer("");

    const apiFunction = selectedOption?.api;

    if (!apiFunction) {
      toast.error(
        "A funcionalidade para esta opção ainda não foi implementada."
      );
      setIsLoading(false);
      return;
    }

    try {
      toast.info("Processando sua solicitação...");
      const data = await apiFunction(payload.value);
      setAnswer(data.response || data);
    } catch (error) {
      toast.error(
        "Não foi possível gerar sua resposta. Tente novamente mais tarde."
      );
      setAnswer("");
    } finally {
      setIsLoading(false);
    }
  }
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

      <Mindzy
        key={activeApp}
        options={appData[activeApp].options}
        onSubmit={handleSubmit}
        answer={answer}
        isLoading={isLoading}
        selectedOption={selectedOption}
        onOptionSelect={setSelectedOption}
      />
    </div>
  );
};

export default MindzyHub;
