package com.luizmatoso.mindzy.service;

import com.luizmatoso.mindzy.model.GeneratedAnswer;
import com.luizmatoso.mindzy.model.User;
import com.luizmatoso.mindzy.repository.GeneratedAnswerRepository;
import com.luizmatoso.mindzy.repository.UserRepository;
import com.luizmatoso.mindzy.responses.HistoryResponse;
import com.luizmatoso.mindzy.responses.UserResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class HistoryService {

    private final GeneratedAnswerRepository generatedAnswerRepository;
    private final UserRepository userRepository;

    public HistoryService(GeneratedAnswerRepository generatedAnswerRepository, UserRepository userRepository){
        this.generatedAnswerRepository = generatedAnswerRepository;
        this.userRepository = userRepository;
    }

    private HistoryResponse convertToHistoryResponse(GeneratedAnswer answerEntity) {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(answerEntity.getUser().getId());
        userResponse.setUsername(answerEntity.getUser().getActualUsername());

        HistoryResponse historyResponse = new HistoryResponse();
        historyResponse.setId(answerEntity.getId());
        historyResponse.setTopic(answerEntity.getTopic());
        historyResponse.setAnswer(answerEntity.getAnswer());
        historyResponse.setCreatedAt(answerEntity.getCreatedAt());
        historyResponse.setUserResponse(userResponse);

        return historyResponse;
    }

    public HistoryResponse saveAnswer(String topic, String answer){
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        GeneratedAnswer newAnswer = new GeneratedAnswer();

        User managedUser = userRepository.findById(principal.getId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        newAnswer.setTopic(topic);
        newAnswer.setAnswer(answer);
        newAnswer.setUser(managedUser);

        GeneratedAnswer savedAnswer = generatedAnswerRepository.save(newAnswer);

        return convertToHistoryResponse(savedAnswer);
    }

    public HistoryResponse saveCodeAnswer(String code, String answer) {
        String topic = "Análise de Código";

        if (code != null && !code.isBlank()) {
            int maxLength = 60;
            String snippetPreview = code.trim();
            if (snippetPreview.length() > maxLength) {
                snippetPreview = snippetPreview.substring(0, maxLength);
            }
            topic += ": " + snippetPreview.replaceAll("\\s+", " ") + "...";
        }

        return this.saveAnswer(topic, answer);
    }

    public List<HistoryResponse> findHistoryForCurrentUser(){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<GeneratedAnswer> historyEntities = generatedAnswerRepository.findByUserOrderByCreatedAtDesc(user);

        return historyEntities.stream()
                .map(this::convertToHistoryResponse)
                .collect(Collectors.toList());
    }

    public void deleteAnswer(UUID id){
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        GeneratedAnswer answer = generatedAnswerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resposta não encontrada."));

        User managedUser = userRepository.findById(principal.getId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        if (!answer.getUser().getId().equals(managedUser.getId())) {
            throw new SecurityException("Acesso negado.");
        }

        generatedAnswerRepository.delete(answer);
    }
}