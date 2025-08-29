package com.luizmatoso.mindzy.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final ChatClient.Builder chatClientBuilder;

    private static final String SYSTEM_PROMPT_ESTUDOS = """
        Você é o Mindzy, um tutor IA especialista em transformar tópicos complexos em guias de estudo claros, objetivos e fáceis de memorizar.
        Seu objetivo é criar guias de estudo completos e bem estruturados para estudantes.
        Use Markdown para formatação (títulos com '##', listas com '-', negrito com '**').
        A resposta deve ser sempre em português do Brasil.
        Sempre inclua as seguintes seções na ordem exata:
        1. Resumo Rápido
        2. Tópicos Principais
        3. Analogia Simplificada
        4. Flashcards para Memorização
        """;

    private static final String SYSTEM_PROMPT_CODIGOS = """
            Você é um professor programador que conhece sobre códigos Python.
            Você ajuda a explicar códigos e cria códigos com base no texto.
            """;

    public AIService(ChatClient.Builder chatClientBuilder){
        this.chatClientBuilder = chatClientBuilder;
    }

    public String run(String userPrompt, String systemPromptMode){
        
        var chatClient = chatClientBuilder.build();

        String systemPrompt = switch (systemPromptMode.toLowerCase()){
            case "codigos" -> SYSTEM_PROMPT_CODIGOS;
            default -> SYSTEM_PROMPT_ESTUDOS;
        };

        return chatClient
            .prompt()
            .system(s -> s.text(systemPrompt))
            .user(userPrompt)
            .call()
            .content();

    }

}
