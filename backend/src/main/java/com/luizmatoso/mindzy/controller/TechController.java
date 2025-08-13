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

    // Prompts
    String explicarCodigo = """
            Explique o que o código a seguir realiza de uma maneira simples e rápida:
            """;

    String criarCodigo = """
            Crie um código em Python conforme os detalhes a seguir:
            """;

    @PostMapping("/explicarCodigo")
    public Map<String, String> explainCode(@RequestBody String code) {
        String prompt = explicarCodigo + code;
        return Map.of("response", aiService.run(prompt));
    }

    @PostMapping("/criarCodigo")
    public Map<String, String> createCode(@RequestBody String codeDetails){
        String prompt = criarCodigo + codeDetails;
        return Map.of("response", aiService.run(prompt));
    }

}
