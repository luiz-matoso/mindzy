package com.luizmatoso.mindzy.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.luizmatoso.mindzy.service.AIService;

@RestController
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService){
        this.aiService = aiService;
    }

    @GetMapping("/flashcards")
    public Map<String, String> generateFlashcards(@RequestParam String topic){
        String prompt = "Faça flashcards rápidos e pequenos sobre " + topic.toUpperCase();
        return Map.of("response", aiService.run(prompt));
    }

    @GetMapping("/resumo")
    public Map<String, String> summarizeText(@RequestParam String text){
        String prompt = "Faça um breve resumo desse texto: " + text;
        return Map.of("response", aiService.run(prompt));
    }

}
