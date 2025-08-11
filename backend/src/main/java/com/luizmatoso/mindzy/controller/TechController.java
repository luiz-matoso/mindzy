package com.luizmatoso.mindzy.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.luizmatoso.mindzy.service.AIService;


@RestController
public class TechController {

    private final AIService aiService;

    public TechController(AIService aiService){
        this.aiService = aiService;
    }

    @PostMapping("/explainCode")
    public Map<String, String> explainCode(@RequestBody String code) {
        String prompt = "Explique o que esse código faz de uma maneira simples e rápida: " + code;
        return Map.of("response", aiService.run(prompt));
    }

    @PostMapping("/createCode")
    public Map<String, String> createCode(@RequestBody String codeDetails){
        String prompt = "Crie um código simples conforme o pedido a seguir " + codeDetails;
        return Map.of("response", aiService.run(prompt));
    }

}
