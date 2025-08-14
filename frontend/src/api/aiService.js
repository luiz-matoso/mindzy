const BASE_URL = "http://localhost:8080";

// TechController...

export async function explainCode(question) {
  const response = await fetch(`${BASE_URL}/explicarCodigo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  return response.json();
}

export async function createCode(question) {
  const response = await fetch(`${BASE_URL}/criarCodigo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  return response.json();
}

// StudentController...

export async function generateFlashcards(question) {
  const response = await fetch(`${BASE_URL}/flashcards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  return response.json();
}

export async function summarizeText(question) {
  const response = await fetch(`${BASE_URL}/resumo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  return response.json();
}

export async function explainSubject(question) {
  const response = await fetch(`${BASE_URL}/explicar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  return response.json();
}

// FunController

export async function generateJokes(question) {
  const response = await fetch(`${BASE_URL}/piadas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  return response.json();
}

export async function generateCuriosities(question) {
  const response = await fetch(`${BASE_URL}/curiosidades`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  return response.json();
}
