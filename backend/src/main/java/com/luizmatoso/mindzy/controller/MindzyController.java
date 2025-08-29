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

        String userPrompt = """
                Por favor, crie um guia de estudos completo sobre o seguinte tema: **%s**.

                Siga estritamente a estrutura solicitada, usando Markdown.

                **Estrutura da Resposta:**

                ## 1. Resumo Rápido
                (Um parágrafo conciso introduzindo o tema e sua importância.)

                ## 2. Tópicos Principais
                (Uma lista com '-' dos 3 a 5 conceitos mais importantes sobre o tema, cada um com uma breve explicação.)

                ## 3. Analogia Simplificada
                (Uma analogia ou exemplo prático que ajude a entender a ideia central do tema de forma simples.)

                ## 4. Flashcards para Memorização
                (Crie 5 flashcards no formato exato: "P: [Pergunta sobre um ponto chave]\nR: [Resposta direta e curta]")
                """.formatted(topic);
        return Map.of("response", aiService.run(userPrompt, "estudos"));
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
