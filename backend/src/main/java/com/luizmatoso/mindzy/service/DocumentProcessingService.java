package com.luizmatoso.mindzy.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Service
public class DocumentProcessingService {

    private final ChatClient.Builder chatClientBuilder;

    public DocumentProcessingService(ChatClient.Builder chatClientBuilder) {
        this.chatClientBuilder = chatClientBuilder;
    }

    public String processFileAndSendToAi(MultipartFile file) throws IOException {
        String extractedText = extractTextFromFile(file);

        String promptTemplate = """
            Você é um assistente de estudos especialista em criar resumos e anotações.
            Sua tarefa é analisar o texto de uma aula que vou fornecer e criar um material de estudo otimizado.

            Com base no texto abaixo, gere o seguinte:
            1.  **Resumo Principal:** Um parágrafo curto resumindo o tema central da aula.
            2.  **Pontos-Chave:** Uma lista (bullet points) com os 5 a 7 conceitos mais importantes abordados.
            3.  **Conceitos Essenciais:** Defina 3 termos ou conceitos cruciais mencionados no texto.
            4.  **Perguntas para Reflexão:** Crie 2 perguntas abertas que incentivem o aprofundamento no assunto.

            Formate toda a resposta usando Markdown para melhor legibilidade.

            Aqui está o texto da aula:
            ---
            {TEXTO_DO_PDF}
            ---
            """;

        String finalPrompt = promptTemplate.replace("{TEXTO_DO_PDF}", extractedText);

        var chatClient = chatClientBuilder.build();

        return chatClient.prompt()
                .user(finalPrompt)
                .call()
                .content();
    }

    private String extractTextFromFile(MultipartFile file) throws IOException {
        String contentType = file.getContentType();

        if (contentType == null) {
            throw new IOException("Não foi possível determinar o tipo do arquivo.");
        }

        switch (contentType) {
            case "application/pdf":
                return extractTextFromPdf(file.getInputStream());
            default:
                throw new IOException("Formato de arquivo não suportado: " + contentType);
        }
    }

    private String extractTextFromPdf(InputStream inputStream) throws IOException {
        try (PDDocument document = PDDocument.load(inputStream)) {
            PDFTextStripper stripper = new PDFTextStripper();
            stripper.setEndPage(10);
            return stripper.getText(document);
        }
    }

}