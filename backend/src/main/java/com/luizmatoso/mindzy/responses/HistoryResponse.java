package com.luizmatoso.mindzy.responses;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class HistoryResponse {

    private UUID id;
    private String topic;
    private String answer;
    private LocalDateTime createdAt;
    private UserResponse userResponse;


}
