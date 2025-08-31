import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa";
import { deleteHistoryItem, getHistory } from "../../api/api";

const HistorySidebar = ({ isOpen, onClose, onViewItem }) => {
  const { t } = useTranslation();
  const [historyItems, setHistoryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function loadHistory() {
    setIsLoading(true);
    try {
      const data = await getHistory();
      if (Array.isArray(data)) {
        setHistoryItems(data);
      } else {
        setHistoryItems([]);
      }
    } catch (error) {
      toast.error(t("erroCarregarHistorico", "Erro ao carregar o histórico."));
      setHistoryItems([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  async function handleDelete(id, e) {
    e.stopPropagation();
    try {
      await deleteHistoryItem(id);
      setHistoryItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
      toast.success(t("itemDeletado"));
    } catch (error) {
      toast.error(t("erroDeletarItem"));
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-neutral-900 border-l border-neutral-800 shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">{t("historico")}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 text-3xl hover:text-white"
            >
              &times;
            </button>
          </div>
          <div className="flex-grow overflow-y-auto pr-2">
            {isLoading && <p className="text-gray-400">{t("carregando")}...</p>}
            {!isLoading && historyItems.length === 0 && (
              <p className="text-gray-500">{t("historicoVazio")}</p>
            )}
            {!isLoading &&
              historyItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onViewItem(item);
                  }}
                  className="block p-4 mb-3 bg-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-700 transition-colors group"
                >
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-white truncate pr-4">
                      {item.topic}
                    </p>
                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(item.createdAt).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistorySidebar;
