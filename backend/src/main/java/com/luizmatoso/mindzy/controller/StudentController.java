package com.luizmatoso.mindzy.controller;

import com.luizmatoso.mindzy.service.AIService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class StudentController {
    private final AIService aiService;

    public StudentController(AIService aiService){
        this.aiService = aiService;
    }

    @PostMapping("/flashcards")
    public Map<String, String> generateFlashcards(@RequestBody Map<String, String> request){
        String topic = request.get("question");
        String prompt = """
                Crie flashcards enumerados
                Crie flashcards com base nesse tema: %s
                """.formatted(topic);
        return Map.of("response", aiService.run(prompt, "estudos"));
    }

    @PostMapping("/resumo")
    public Map<String, String> summarizeText(@RequestBody Map<String, String> request){
        String text = request.get("question");
        String prompt = """
               Faça um resumo do texto abaixo
               %s
               """.formatted(text);
        return Map.of("response", aiService.run(prompt, "estudos"));
    }

    @PostMapping("/explicar")
    public Map<String, String> explainSubject(@RequestBody Map<String, String> request){
        String subject = request.get("question");
        String prompt = """
                Explique detadalhamente o tema a seguir: %s
                """.formatted(subject);
        return Map.of("response", aiService.run(prompt, "estudos"));
    }

}
