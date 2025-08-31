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

    public List<com.luizmatoso.mindzy.responses.HistoryResponse> findHistoryForCurrentUser(){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<GeneratedAnswer> historyEntities = generatedAnswerRepository.findByUserOrderByCreatedAtDesc(user);

        return historyEntities.stream()
                .map(this::convertToHistoryResponse)
                .collect(Collectors.toList());
    }
}