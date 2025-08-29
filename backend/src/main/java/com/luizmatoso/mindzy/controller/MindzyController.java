package com.luizmatoso.mindzy.controller;

import com.luizmatoso.mindzy.service.AIService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequestMapping("/mindzy")
@RestController
public class MindzyController {
    private final AIService aiService;

    public MindzyController(AIService aiService){
        this.aiService = aiService;
    }

    @PostMapping("/education")
    public Map<String, String> generateFlashcards(@RequestBody Map<String, String> request){
        String topic = request.get("question");
        String prompt = """
                Crie flashcards enumerados
                Crie flashcards com base nesse tema: %s
                """.formatted(topic);
        return Map.of("response", aiService.run(prompt, "estudos"));
    }

    @PostMapping("/tech")
    public Map<String, String> explainCode(@RequestBody Map<String, String> request) {
        String code = request.get("question");
        String prompt = """
                Explique esse código a seguir com base no seu conhecimento em Python: %s
                """.formatted(code);
        return Map.of("response", aiService.run(prompt, "codigos"));
    }
}
