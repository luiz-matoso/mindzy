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

    @PostMapping("/explicarCodigo")
    public Map<String, String> explainCode(@RequestBody String code) {
        String prompt = """
                Explique esse código a seguir com base no seu conhecimento em Python: %s
                """.formatted(code);
        return Map.of("response", aiService.run(prompt, "codigos"));
    }

    @PostMapping("/criarCodigo")
    public Map<String, String> createCode(@RequestBody String codeDetails){
        String prompt = """
                Com base nos seus conhecimentos em Python
                Crie o código com base nessas informações: %s
                """.formatted(codeDetails);
        return Map.of("response", aiService.run(prompt, "codigos"));
    }

}
