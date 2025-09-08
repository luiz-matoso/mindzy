# 🧠 Mindzy - Hub de Assistentes IA

**Mindzy** é uma plataforma web moderna e interativa que centraliza diversas ferramentas de Inteligência Artificial em um "Hub" modular. O projeto utiliza um backend robusto com **Spring Boot** e **Spring AI**, conectando-se a modelos de linguagem locais (LLMs) via **Ollama**, e um frontend dinâmico em **React** com **Tailwind CSS**.

A aplicação oferece soluções especializadas através de "apps", como Educação (`.edu`) e Tecnologia (`.tech`), garantindo uma experiência de usuário fluida, segura, privada e rica em funcionalidades.

---

## ✨ Funcionalidades Principais

- ✅ **Sistema Modular:** Arquitetura centrada em "apps" independentes que podem ser facilmente expandidos.
  - 📚 **Hub de Educação (`.edu`):** Ferramentas para aprendizado, como explicar tópicos complexos e analisar documentos.
  - 💻 **Hub de Tecnologia (`.tech`):** Ferramentas para desenvolvedores, como explicar trechos de código e analisar arquivos de código-fonte.
- 🤖 **Integração com LLMs Locais:** Utiliza **Spring AI** para se conectar a modelos como **Gemma** através do **Ollama**, garantindo privacidade e controle total sobre a IA.
- 👤 **Autenticação Segura:** Sistema completo de registro e login com **Spring Security** e tokens **JWT**, garantindo que cada usuário tenha seu próprio espaço e histórico protegido.
- 📜 **Histórico Persistente:** Todas as respostas geradas pela IA são salvas no banco de dados e podem ser visualizadas e recarregadas a partir de uma barra lateral.
- 📄 **Upload de Arquivos:** Capacidade de processar e analisar arquivos `.pdf` enviados pelo usuário.
- 🌐 **Suporte a Múltiplos Idiomas (i18n):** Estrutura preparada para internacionalização com `react-i18next`.
- 🚀 **UI Moderna e Responsiva:** Interface construída com **React** e **Tailwind CSS**, focada em uma experiência de usuário limpa, com animações e design totalmente responsivo.

---

## 🎥 Demonstração Visual (placeholder)

#### Autenticação de Usuário (Login e Registro)

#### Hub de Educação em Ação

#### Análise de Documentos e Histórico

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Framework:** [ReactJS](https://reactjs.org/) (v19)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Roteamento:** [React Router DOM](https://reactrouter.com/)
- **Renderização de Markdown:** [React Markdown](https://github.com/remarkjs/react-markdown)
- **Cliente HTTP:** [Axios](https://axios-http.com/)
- **Traduções (i18n):** [react-i18next](https://react.i18next.com/)
- **Notificações:** [React Toastify](https://fkhadra.github.io/react-toastify/)

### Backend

- **Framework:** [Spring Boot](https://spring.io/projects/spring-boot) (v3)
- **Linguagem:** [Java](https://www.java.com/) 21
- **Inteligência Artificial:** [Spring AI](https://spring.io/projects/spring-ai)
- **LLM Runtime:** [Ollama](https://ollama.com/)
- **Segurança:** [Spring Security](https://spring.io/projects/spring-security)
- **Autenticação:** Tokens JWT (JSON Web Tokens)
- **Acesso a Dados:** [Spring Data JPA](https://spring.io/projects/spring-data-jpa) / [Hibernate](https://hibernate.org/)
- **Banco de Dados:** PostgreSQL
- **Envio de E-mails:** Spring Boot Mail Sender
- **Build Tool:** [Maven](https://maven.apache.org/)

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos

- **Java Development Kit (JDK)** (versão 21 ou superior)
- **Maven** 3.9+
- **Node.js** (versão 18 ou superior) e **npm**
- **PostgreSQL**
- **Ollama:** Instale e execute um modelo. Ex: `ollama pull gemma:2b`
- **Git**

### 1\. Clonar o Repositório

```bash
git clone https://github.com/luiz-matoso/mindzy.git
cd mindzy
```

### 2\. Configurar e Executar o Backend (Spring Boot)

O backend utiliza variáveis de ambiente para gerenciar configurações sensíveis.

**a.** Navegue até a pasta do backend:

```bash
cd backend
```

**b.** Crie um arquivo `.env` na raiz da pasta `backend` e preencha com suas credenciais. Você pode usar o exemplo abaixo como base.

**`backend/.env.example`**

```env
# Configuração do Banco de Dados
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/mindzy
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=sua_senha_do_postgres

# Segredo para gerar os tokens JWT (use um valor longo e seguro)
JWT_SECRET_KEY=segredo_super_forte_e_longo_para_garantir_a_seguranca_dos_tokens

# Configuração de E-mail (usando Gmail como exemplo)
# E-mail que enviará as notificações
SUPPORT_EMAIL=seu-email@gmail.com
# Senha de App gerada pelo Google (não é a senha da sua conta)
APP_PASSWORD=sua_senha_de_app_do_google
```

**Atenção:** Spring Boot não lê arquivos `.env` nativamente. Você precisa carregar essas variáveis no seu ambiente. A forma mais fácil é usar o plugin **"EnvFile"** na sua IDE (IntelliJ ou VS Code) ou exportá-las manualmente no seu terminal.

**c.** Execute a aplicação com Maven:

```bash
./mvnw spring-boot:run
```

### 3\. Configurar e Executar o Frontend (React)

**a.** Em um novo terminal, navegue até a pasta do frontend:

```bash
# A partir da raiz do projeto
cd frontend
```

**b.** Instale as dependências:

```bash
npm install
```

**c.** Crie um arquivo `.env` na raiz da pasta `frontend` para definir a URL da API:

**`frontend/.env`**

```env
# URL base da sua API do backend
VITE_API_BASE_URL=http://localhost:8080
```

**d.** Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Após esses passos, o frontend estará acessível em `http://localhost:5173` e o backend em `http://localhost:8080`.

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE.md` para mais detalhes.

---

## 👨‍💻 Autor

Feito com ❤️ por **Luiz Matoso**

- **LinkedIn:** [https://www.linkedin.com/in/luizmatoso/](https://www.linkedin.com/in/luizmatoso/)
- **GitHub:** [https://github.com/luiz-matoso/](https://github.com/luiz-matoso/)
