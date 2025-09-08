package com.luizmatoso.mindzy.controller;

import com.luizmatoso.mindzy.service.DocumentProcessingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/docs")
public class DocumentController {

    private final DocumentProcessingService documentProcessingService;

    @Autowired
    public DocumentController(DocumentProcessingService documentProcessingService) {
        this.documentProcessingService = documentProcessingService;
    }

    @PostMapping("/process")
    public ResponseEntity<Map<String, String>> processDocument(@RequestParam("file") MultipartFile file) throws IOException {
            String aiResult = documentProcessingService.processFileAndSendToAi(file);
            return ResponseEntity.ok(Map.of("response", aiResult));
    }
}