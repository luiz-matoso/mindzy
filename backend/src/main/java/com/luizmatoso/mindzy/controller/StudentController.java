package com.luizmatoso.mindzy.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.luizmatoso.mindzy.service.AIService;

@RestController
public class StudentController {
    private final AIService aiService;

    public StudentController(AIService aiService){
        this.aiService = aiService;
    }

    // Prompts
    String flashcards = """
                Você deve enumerar os flashcards de 1 ao número de flashcards criados.
                Crie flashcards rápido e pequenos em tópicos sobre 
            """;

    String resumos = """
                Você deve ler o texto e reescrever de forma resumida o texto a seguir:
            """;

    String explicar = """
                Faça uma explicação detalhada sobre o assunto a seguir:
            """;

    @PostMapping("/flashcards")
    public Map<String, String> generateFlashcards(@RequestBody String topic){
        String prompt = flashcards + topic;
        return Map.of("response", aiService.run(prompt));
    }

    @PostMapping("/resumo")
    public Map<String, String> summarizeText(@RequestBody String text){
        String prompt = resumos + text;
        return Map.of("response", aiService.run(prompt));
    }

    @PostMapping("/explicar")
    public Map<String, String> explainSubject(@RequestBody String subject){
        String prompt = explicar + subject;
        return Map.of("response", aiService.run(prompt));
    }

}
