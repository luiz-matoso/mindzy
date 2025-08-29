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
