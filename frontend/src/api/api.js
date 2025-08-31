import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

apiClient.interceptors.request.use(
  (config) => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      const token = JSON.parse(userSession).token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Mindzy - Histórico
// Mindzy - History

export const getHistory = async () => {
  try {
    const response = await apiClient.get("/mindzy/history");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    throw error;
  }
};

export const saveHistory = async (topic, answer) => {
  try {
    const response = await apiClient.post("/mindzy/history", { topic, answer });
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar no histórico:", error);
    throw error;
  }
};

export const deleteHistoryItem = async (id) => {
  try {
    await apiClient.delete(`/mindzy/history/${id}`);
  } catch (error) {
    console.error("Erro ao deletar item do histórico:", error);
    throw error;
  }
};

// Mindzy.EDU

export const explainTopic = async (topic) => {
  try {
    const response = await apiClient.post("/mindzy/education", {
      question: topic,
    });
    return response.data;
  } catch (error) {
    toast.error("Houve um erro. Tente novamente mais tarde.");
  }
};

export const analyzeDoc = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post("/docs/process", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Houve um erro. Tente novamente mais tarde.");
  }
};
