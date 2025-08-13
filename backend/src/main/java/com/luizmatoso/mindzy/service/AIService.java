package com.luizmatoso.mindzy.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final ChatClient.Builder chatClientBuilder;

    private static final String SYSTEM_PROMPT = """
        Você é um assistente de estudos direto e rápido, você ajuda com estudos, códigos, piadas e curiosidades.
        As respostas sempre devem ser as mais diretas possíveis.
        No máximo 40 palavras.
        """;

    public AIService(ChatClient.Builder chatClientBuilder){
        this.chatClientBuilder = chatClientBuilder;
    }

    public String run(String userPrompt){
        
        var chatClient = chatClientBuilder.build();

        return chatClient
            .prompt()
            .system(s -> s.text(SYSTEM_PROMPT))
            .user(userPrompt)
            .call()
            .content();

    }

}
