import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const BASE_URL = "http://localhost:8080";

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (password === confirmPassword) {
        const response = await axios.post(`${BASE_URL}/auth/signup`, {
          username,
          email,
          password,
        });

        toast.success(t("toastCadastro.success"));
        navigate("/verify_account", { state: { email: email } });
      } else {
        toast.error(t("toastCadastro.error"));
      }
    } catch (error) {
      toast.error(t("toastCadastro.errorerror"));
    }
  };

  return (
    <div>
      <section className="text-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <h2 className="text-5xl bg-gradient-to-r from-purple-500 via-teal-500 to-red-500 text-transparent bg-clip-text p-4 animate-gradient">
              Mindzy
            </h2>
          </a>
          <div className="w-full bg-neutral-900 border border-zinc-800 rounded-lg md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {t("cadastroTitle")}
              </h1>
              <form
                onSubmit={onSubmitHandler}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("usuario")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="username"
                    className="caret-zinc-400 bg-gradient-to-r from-orange-500 via-indigo-500 to-green-500 text-transparent bg-clip-text text-center border-2 border-neutral-600 focus:border-neutral-400 focus:ring-neutral-500 focus:outline-none text-sm rounded-lg block w-full p-2.5"
                    placeholder="johndoe123"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="caret-zinc-400 bg-gradient-to-r from-orange-500 via-indigo-500 to-green-500 text-transparent bg-clip-text text-center border-2 border-neutral-600 focus:border-neutral-400 focus:ring-neutral-500 focus:outline-none text-sm rounded-lg block w-full p-2.5"
                    placeholder="nome@email.com"
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
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("confirmSenha")}
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="caret-zinc-400 bg-gradient-to-r from-orange-500 via-indigo-500 to-green-500 text-transparent bg-clip-text text-center border-2 border-neutral-600 focus:border-neutral-400 focus:ring-neutral-500 focus:outline-none text-sm rounded-lg block w-full p-2.5"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      {t("euAceito")}{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        {t("termosCond")}
                      </a>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-l from-[#06b6d4] via-[#0d9488] to-[#15803d] text-white w-full text-white bg-blue-600 cursor-pointer hover:bg-gradient-to-r focus:ring focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Criar conta
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {t("jaPossui")}{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    {t("facaLoginAqui")}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
