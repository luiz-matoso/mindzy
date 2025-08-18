import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const BASE_URL = "http://localhost:8080";

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/auth/signin`, {
        email,
        password,
      });

      toast.success("Login bem-sucedido");
      navigate("/");
    } catch (error) {
      toast.error("Email ou senha incorretos. Tente novamente.");
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
                Faça o seu login
              </h1>
              <form
                onSubmit={onSubmitHandler}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Seu email
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
                    Senha
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
                  className="bg-gradient-to-l from-[#06b6d4] via-[#0d9488] to-[#15803d] text-white w-full text-white bg-blue-600 cursor-pointer hover:bg-gradient-to-r focus:ring focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Não tem uma conta?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Crie aqui
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

export default Login;
