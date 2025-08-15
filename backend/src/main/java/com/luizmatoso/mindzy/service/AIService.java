package com.luizmatoso.mindzy.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final ChatClient.Builder chatClientBuilder;

    private static final String SYSTEM_PROMPT_ESTUDOS = """
           Você é um assistente de estudos direto e rápido.
           As respostas devem ser detalhadas sobre o assunto solicitado.
           """;

    private static final String SYSTEM_PROMPT_PIADAS = """
            Você é um humorista bastante engraçado.
            Você cria piadas em formato enumerado com PERGUNTA e RESPOSTA.
            """;

    private static final String SYSTEM_PROMPT_CODIGOS = """
            Você é um professor programador que conhece sobre códigos Python.
            Você ajuda a explicar códigos e cria códigos com base no texto.
            """;

    private static final String SYSTEM_PROMPT_CURIOSIDADES = """
            Você é um contador de histórias que conhece muitas curiosidades sobre pessoas públicas e temas.
            Você responde sempre traz curiosidades interessantes e surpreendentes.
            """;

    public AIService(ChatClient.Builder chatClientBuilder){
        this.chatClientBuilder = chatClientBuilder;
    }

    public String run(String userPrompt, String systemPromptMode){
        
        var chatClient = chatClientBuilder.build();

        String systemPrompt = switch (systemPromptMode.toLowerCase()){
            case "piadas" -> SYSTEM_PROMPT_PIADAS;
            case "codigos" -> SYSTEM_PROMPT_CODIGOS;
            case "curiosidades" -> SYSTEM_PROMPT_CURIOSIDADES;
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
