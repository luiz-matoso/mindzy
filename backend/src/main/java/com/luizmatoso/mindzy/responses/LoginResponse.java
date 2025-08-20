package com.luizmatoso.mindzy.responses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {

    private String token;
    private long expiresIn;
    private String username;
    private String email;

    public LoginResponse(String token, long expiresIn, String username, String email){
        this.token = token;
        this.expiresIn = expiresIn;
        this.username = username;
        this.email = email;
    }

}
