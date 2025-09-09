# 🧠 Mindzy - Hub de Assistentes IA

**Mindzy** é uma plataforma web moderna que centraliza diversas ferramentas de Inteligência Artificial em um "Hub" modular. Com um backend robusto em **Spring Boot 3** e um frontend dinâmico em **React**, o projeto se conecta a modelos de linguagem locais (LLMs) via **Ollama**, oferecendo uma experiência fluida, segura e privada.

---

## ✨ Funcionalidades

- **Hubs Modulares (.edu e .tech):** Módulos especializados para Educação (análise de documentos, resumos) e Tecnologia (explicação de código).
- **IA Local com Spring AI:** Integração com LLMs como Gemma via Ollama, garantindo total privacidade e controle.
- **Autenticação Segura:** Sistema completo de registro e login com Spring Security e tokens JWT.
- **Histórico Persistente:** Todas as conversas são salvas e podem ser recarregadas a partir de uma barra lateral.
- **Análise de Arquivos:** Capacidade de processar e extrair informações de arquivos `.pdf` enviados pelo usuário.
- **UI Moderna e Responsiva:** Interface construída com **Tailwind CSS**, focada em uma experiência limpa e totalmente responsiva.

---

## 🎥 Demonstração Visual

#### 📄 Análise Inteligente de Documentos (.edu)

Veja o Mindzy processar um arquivo PDF enviado pelo usuário e gerar um material de estudo completo com base no seu conteúdo.

#### 💻 Explicação de Código-Fonte (.tech)

Demonstração da capacidade de colar um trecho de código complexo e receber uma análise detalhada, incluindo explicações e sugestões de melhoria.

---

## 🛠️ Tecnologias Utilizadas

| Categoria          | Tecnologias Principais                                              |
| :----------------- | :------------------------------------------------------------------ |
| **Frontend**       | React 19, Vite, Tailwind CSS, Axios, React Router, React Markdown   |
| **Backend**        | Java 21, Spring Boot 3, Spring AI, Spring Security, JPA / Hibernate |
| **Banco de Dados** | PostgreSQL                                                          |
| **DevOps & IA**    | Maven, Git, Ollama, JWT                                             |

---

## 🚀 Executando Localmente

**Pré-requisitos:** Java 21+, Node.js 18+, Maven, PostgreSQL, Ollama (com um modelo, ex: `ollama pull gemma:2b`) e Git.

### 1\. Clonar o Repositório

```bash
git clone https://github.com/luiz-matoso/mindzy.git && cd mindzy
```

### 2\. Configurar o Backend (Spring)

O backend usa `application.properties` para configurações gerais e variáveis de ambiente para dados sensíveis.

**a.** Crie o arquivo `application.properties` em `backend/src/main/resources/` com o seguinte conteúdo. Ele define as configurações fixas e aponta para as variáveis de ambiente para os dados sensíveis.

```properties
# Nome da aplicação
spring.application.name=mindzy

# Configurações do Spring AI para Ollama
spring.ai.ollama.base-url=http://localhost:11434
spring.ai.ollama.chat.model=gemma:2b

# Configuração do Banco de Dados (lendo de variáveis de ambiente)
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
spring.jpa.hibernate.ddl-auto=update

# Segurança com JWT (lendo de variáveis de ambiente)
security.jwt.secret-key=${JWT_SECRET_KEY}
```

**b.** Para os dados sensíveis, você deve configurar as variáveis de ambiente. A forma mais fácil é criar um arquivo `.env` na raiz da pasta `backend` e usar um plugin como **"EnvFile"** na sua IDE (IntelliJ/VS Code).

**Exemplo de conteúdo para o arquivo `.env`:**

```env
# Variáveis para o banco de dados
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/mindzy
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=sua_senha_do_postgres

# Variável para o segredo do JWT
JWT_SECRET_KEY=segredo_super_forte_e_longo_para_garantir_a_seguranca_dos_tokens
```

**c.** Execute o backend:

```bash
# Dentro da pasta /backend
./mvnw spring-boot:run
```

### 3\. Configurar o Frontend (React)

Em um novo terminal, execute os seguintes passos:

```bash
# Navegue até a pasta do frontend
cd frontend

# Instale as dependências
npm install
```

Crie o arquivo `frontend/.env` com a URL da API:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Finalmente, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE.md` para mais detalhes.

---

## 👨‍💻 Autor

Feito com ❤️ por **Luiz Matoso**

- **LinkedIn:** [https://www.linkedin.com/in/luizmatoso/](https://www.linkedin.com/in/luizmatoso/)
- **GitHub:** [https://github.com/luiz-matoso/](https://github.com/luiz-matoso/)
