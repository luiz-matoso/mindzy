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

    @PostMapping("/flashcards")
    public Map<String, String> generateFlashcards(@RequestBody String topic){
        String prompt = """
                Crie flashcards enumerados
                Crie flashcards com base nesse tema: %s
                """.formatted(topic);
        return Map.of("response", aiService.run(prompt, "estudos"));
    }

    @PostMapping("/resumo")
    public Map<String, String> summarizeText(@RequestBody String text){
        String prompt = """
               Faça um resumo do texto abaixo
               %s
               """.formatted(text);
        return Map.of("response", aiService.run(prompt, "estudos"));
    }

    @PostMapping("/explicar")
    public Map<String, String> explainSubject(@RequestBody String subject){
        String prompt = """
                Explique detadalhamente o tema a seguir: %s
                """.formatted(subject);
        return Map.of("response", aiService.run(prompt, "estudos"));
    }

}
