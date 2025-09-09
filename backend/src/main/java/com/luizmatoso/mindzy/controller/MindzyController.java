package com.luizmatoso.mindzy.controller;

import com.luizmatoso.mindzy.service.AIService;
import com.luizmatoso.mindzy.service.HistoryService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequestMapping("/mindzy")
@RestController
public class MindzyController {
    private final AIService aiService;
    private final HistoryService historyService;

    public MindzyController(AIService aiService, HistoryService historyService){
        this.aiService = aiService;
        this.historyService = historyService;
    }

    @PostMapping("/education")
    public Map<String, String> generateStudy(@RequestBody Map<String, String> request){
        String topic = request.get("question");

        String prompt = """
                Por favor, crie um guia de estudos completo sobre o seguinte tema: **%s**.

                Siga estritamente a estrutura solicitada, usando Markdown.
                Use Markdown para formatação (títulos com '##', listas com '-', negrito com '**').

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

        String aiResponse = aiService.run(prompt, "estudos");

        historyService.saveAnswer(topic, aiResponse);

        return Map.of("response", aiResponse);
    }

    @PostMapping("/tech")
    public Map<String, String> explainCode(@RequestBody Map<String, String> request) {
        String code = request.get("question");

        String prompt = """
                Como um engenheiro sênior, analise o seguinte trecho de código em **Python**.
                A resposta DEVE ser em PORTUGUES - BRASILEIRO.
            
                Siga estritamente esta estrutura de resposta:
            
                ## 1. O Que o Código Faz?
                (Um resumo de alto nível, em um parágrafo, sobre o objetivo principal do código.)
            
                ## 2. Análise Detalhada
                (Uma explicação passo a passo, podendo ser por trechos ou linhas importantes, detalhando a lógica e o fluxo de execução.)
            
                ## 3. Boas Práticas e Sugestões de Melhoria
                (Identifique pontos fortes do código e sugira melhorias de performance, legibilidade ou segurança. Se não houver melhorias óbvias, apenas elogie as boas práticas utilizadas.)
                
                Código para análise:
                ```python
                **%s**
                ```
                """.formatted(code);

        String aiResponse = aiService.run(prompt, "codigos");

        historyService.saveAnswer(code, aiResponse);

        return Map.of("reponse", aiResponse);
    }
}
