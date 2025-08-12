package com.luizmatoso.mindzy.controller;

import com.luizmatoso.mindzy.service.AIService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class FunController {

    private final AIService aiService;

    public FunController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/jokes")
    public Map<String, String> generateJokes(@RequestBody String topic){
        String prompt = "Gere 3 piadas com o tema a seguir: " + topic;
        return Map.of("response", aiService.run(prompt));
    }

    @PostMapping("/curiosidades")
    public Map<String, String> generateCuriosities(@RequestBody String topic){
        String prompt = "Gere 3 curiosidades sobre " + topic;
        return Map.of("response", aiService.run(prompt));
    }
}
