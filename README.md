# 🧠 Mindzy - Hub de Assistentes IA

[](https://opensource.org/licenses/MIT)
[](https://spring.io/projects/spring-boot)
[](https://reactjs.org/)
[](https://tailwindcss.com/)

**Mindzy** é uma plataforma web moderna e interativa que centraliza diversas ferramentas de Inteligência Artificial em um "Hub" modular. O projeto utiliza um backend robusto com **Spring Boot** e um frontend dinâmico em **React** com **Tailwind CSS**.

A aplicação oferece soluções especializadas através de "apps", como Educação (`.edu`) e Tecnologia (`.tech`), garantindo uma experiência de usuário fluida, segura e rica em funcionalidades.

-----

## ✨ Funcionalidades Principais

  - ✅ **Sistema Modular:** Arquitetura centrada em "apps" independentes que podem ser facilmente expandindos.
      - 📚 **Hub de Educação (`.edu`):** Ferramentas para aprendizado, como explicar tópicos complexos e analisar documentos.
      - 💻 **Hub de Tecnologia (`.tech`):** Ferramentas para desenvolvedores, como explicar trechos de código e analisar arquivos de código-fonte.
  - 👤 **Autenticação Segura:** Sistema completo de registro e login com **Spring Security** e tokens **JWT**, garantindo que cada usuário tenha seu próprio espaço e histórico protegido.
  - 📜 **Histórico Persistente:** Todas as respostas geradas são salvas no banco de dados e podem ser visualizadas e recarregadas a partir de uma barra lateral de histórico.
  - 🌐 **Suporte a Múltiplos Idiomas (i18n):** Estrutura preparada para internacionalização com `react-i18next`.
  - 🚀 **UI Moderna e Responsiva:** Interface construída com **Tailwind CSS**, focada em uma experiência de usuário limpa, com animações e design totalmente responsivo.
  - 📄 **Upload de Arquivos:** Capacidade de processar arquivos enviados pelo usuário para análise pela IA.

-----

## 🎥 Demonstração Visual

#### Autenticação de Usuário (Login e Registro)

#### Hub de Educação em Ação

#### Análise de Documentos e Histórico

-----

## 🛠️ Tecnologias Utilizadas

### Frontend

  - **Framework:** [ReactJS](https://reactjs.org/)
  - **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
  - **Roteamento:** [React Router DOM](https://reactrouter.com/)
  - **Cliente HTTP:** [Axios](https://axios-http.com/)
  - **Gerenciamento de Estado:** React Context API
  - **Traduções (i18n):** [react-i18next](https://react.i18next.com/)
  - **Notificações:** [React Toastify](https://fkhadra.github.io/react-toastify/)
  - **Build Tool:** [Vite](https://vitejs.dev/)

### Backend

  - **Framework:** [Spring Boot](https://spring.io/projects/spring-boot)
  - **Segurança:** [Spring Security](https://spring.io/projects/spring-security)
  - **Autenticação:** Tokens JWT (JSON Web Tokens)
  - **Acesso a Dados:** [Spring Data JPA](https://spring.io/projects/spring-data-jpa) / [Hibernate](https://hibernate.org/)
  - **Banco de Dados:** PostgreSQL
  - **Build Tool:** [Maven](https://maven.apache.org/)
  - **Linguagem:** [Java](https://www.java.com/) 17

-----

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos

  - **Java Development Kit (JDK)** (versão 17 ou superior)
  - **Maven** 3.8+
  - **PostgreSQL** (ou outro banco de dados relacional)
  - **Node.js** (versão 18 ou superior) e **npm**
  - **Git**

### 1\. Clonar o Repositório

```bash
git clone https://github.com/alex-silva-dev/mindzy.git
cd mindzy
```

### 2\. Configurar e Executar o Backend (Spring Boot)

```bash
# Navegue até a pasta do backend
cd backend

# Crie/Edite o arquivo application.properties em 'src/main/resources'
# ATENÇÃO: Este arquivo contém segredos e não deve ser enviado para o repositório público.
```

**`backend/src/main/resources/application.properties`**

```properties
# Porta do servidor
server.port=8080

# Configuração do Banco de Dados para PostgreSQL local
spring.datasource.url=jdbc:postgresql://localhost:5432/mindzy
spring.datasource.username=postgres
spring.datasource.password=postgres

# Configuração do JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Segredo para gerar os tokens JWT (deve ter pelo menos 256 bits)
jwt.secret=segredo_forte_e_longo_para_garantir_a_seguranca_dos_tokens_jwt_do_mindzy
```

```bash
# Execute a aplicação com Maven
./mvnw spring-boot:run
```

### 3\. Configurar e Executar o Frontend (React)

```bash
# Em um novo terminal, navegue até a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Crie um arquivo .env na raiz da pasta 'frontend'
```

**`frontend/.env`**

```env
# URL base da sua API do backend
VITE_API_BASE_URL=http://localhost:8080
```

```bash
# Inicie o servidor de desenvolvimento do frontend
npm run dev
```

Após esses passos, o frontend estará acessível em `http://localhost:5173` e o backend em `http://localhost:8080`.

-----

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE.md` para mais detalhes.

-----

## 👨‍💻 Autor

Feito com ❤️ por **Luiz Matoso**

  - **LinkedIn:** [https://www.linkedin.com/in/luizmatoso/](https://www.linkedin.com/in/luizmatoso/)
  - **GitHub:** [https://github.com/luiz-matoso/](https://github.com/luiz-matoso/)
