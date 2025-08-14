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

    @PostMapping("/piadas")
    public Map<String, String> generateJokes(@RequestBody Map<String, String> request){
        String topic = request.get("question");
        String prompt = """
                Crie piadas no tema %s
                Enumere as piadas e não esqueça de sempre criar no formato PERGUNTA e RESPOSTA.
                """;
        return Map.of("response", aiService.run(prompt, "piadas"));
    }

    @PostMapping("/curiosidades")
    public Map<String, String> generateCuriosities(@RequestBody Map<String, String> request){
        String topic = request.get("question");
        String prompt = """
                Traga curiosidades interessantes e surpreendentes sobre %s
                """.formatted(topic);
        return Map.of("response", aiService.run(prompt, "curiosidades"));
    }
}
