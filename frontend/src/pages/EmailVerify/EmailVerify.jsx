import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import AuthCard from "../../components/AuthCard/AuthCard";

const EmailVerify = () => {
  const { t } = useTranslation();
  const navigate = useNavigate("");
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      toast.error("E-mail não encontrado. Por favor, cadastra-se novamente.");
    }
  }, [location, navigate]);

  const handleCodeChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setVerifyCode(numericValue);
  };

  const BASE_URL = "http://localhost:8080";

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/auth/verify`, {
        email: email,
        verificationCode: verifyCode,
      });

      const authData = response.data;

      toast.success("Conta verificada com sucesso.");
      navigate("/login");
    } catch (error) {
      toast.error("Erro ao verificar sua conta. Tente novamente.");
    }
  };

  return (
    <AuthCard>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Verifique sua conta
      </h1>
      <p className="text-gray-500 text-sm">
        Um código foi enviado ao seu email, insira o código no campo abaixo e
        verifique sua conta.
      </p>
      <form onSubmit={onSubmitHandler} className="space-y-4 md:space-y-6">
        <div>
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Código
          </label>
          <input
            type="text"
            name="code"
            id="code"
            className="caret-zinc-400 bg-gradient-to-r from-orange-500 via-indigo-500 to-green-500 text-transparent bg-clip-text text-center border-2 border-neutral-600 focus:border-neutral-400 focus:ring-neutral-500 focus:outline-none text-sm rounded-lg block w-full p-2.5"
            placeholder="123456"
            onChange={handleCodeChange}
            value={verifyCode}
            inputMode="numeric"
            pattern="[0-9]{6}"
            required
          />
        </div>

        <button
          type="submit"
          className="gradient-swap-button text-white w-full cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring focus:outline-none"
        >
          <span className="relative z-10">Verificar conta</span>
        </button>
      </form>
    </AuthCard>
  );
};

export default EmailVerify;
