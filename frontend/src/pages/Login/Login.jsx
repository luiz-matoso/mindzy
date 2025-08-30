import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import AuthCard from "../../components/AuthCard/AuthCard";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const BASE_URL = "http://localhost:8080";

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/auth/signin`, {
        email,
        password,
      });

      const authData = response.data;

      login(authData);

      toast.success(t("toastsLogin.success"));
      navigate("/");
    } catch (error) {
      toast.error(t("toastsLogin.error"));
    }
  };

  return (
    <AuthCard>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        {t("loginTitle")}
      </h1>
      <form onSubmit={onSubmitHandler} className="space-y-4 md:space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {t("emailText")}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="caret-zinc-400 bg-gradient-to-r from-orange-500 via-indigo-500 to-green-500 text-transparent bg-clip-text text-center border-2 border-neutral-600 focus:border-neutral-400 focus:ring-neutral-500 focus:outline-none text-sm rounded-lg block w-full p-2.5"
            placeholder={t("emailPlaceholder")}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {t("senha")}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="caret-zinc-400 bg-gradient-to-r from-orange-500 via-indigo-500 to-green-500 text-transparent bg-clip-text text-center border-2 border-neutral-600 focus:border-neutral-400 focus:ring-neutral-500 focus:outline-none text-sm rounded-lg block w-full p-2.5"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type="submit"
          className="gradient-swap-button text-white w-full cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring focus:outline-none"
        >
          <span className="relative z-10">Login</span>
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          {t("naoTemUmaConta")}{" "}
          <Link
            to="/signup"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            {t("crieAqui")}
          </Link>
        </p>
      </form>
    </AuthCard>
  );
};

export default Login;
