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

    // Prompts
    String piadas = """
            Você deve enumerar as piadas de 1 ao 3.
            Gere 3 piadas com o tema sugerido a seguir:
            """;

    String curiosidades = """
            Você deve enumerar as curiosidades de 1 ao 3.
            Busque 3 curiosidades sobre o tema ou fígura pública sugerido a seguir:
            """;

    @PostMapping("/piadas")
    public Map<String, String> generateJokes(@RequestBody String topic){
        String prompt = piadas + topic;
        return Map.of("response", aiService.run(prompt));
    }

    @PostMapping("/curiosidades")
    public Map<String, String> generateCuriosities(@RequestBody String topic){
        String prompt = curiosidades + topic;
        return Map.of("response", aiService.run(prompt));
    }
}
