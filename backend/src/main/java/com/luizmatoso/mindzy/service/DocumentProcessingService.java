package com.luizmatoso.mindzy.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Service
public class DocumentProcessingService {

    public String processFileAndSendToAi(MultipartFile file) throws IOException {
        String extractedText = extractTextFromFile(file);

        return "Texto extraído com sucesso:\n\n" + extractedText;
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
            return stripper.getText(document);
        }
    }

}