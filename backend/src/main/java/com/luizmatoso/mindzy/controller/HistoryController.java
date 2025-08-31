package com.luizmatoso.mindzy.controller;

import com.luizmatoso.mindzy.responses.HistoryResponse;
import com.luizmatoso.mindzy.service.HistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/mindzy/history")
public class HistoryController {

    private final HistoryService historyService;

    public HistoryController(HistoryService historyService){
        this.historyService = historyService;
    }

    @GetMapping
    public ResponseEntity<List<HistoryResponse>> getHistory(){
        return ResponseEntity.ok(historyService.findHistoryForCurrentUser());
    }

    @PostMapping
    public ResponseEntity<HistoryResponse> saveHistory(@RequestBody Map<String, String> payload){
        String topic = payload.get("topic");
        String answer = payload.get("answer");
        HistoryResponse savedAnswer = historyService.saveAnswer(topic, answer);
        return ResponseEntity.ok(savedAnswer);
    }
}