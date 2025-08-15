package com.luizmatoso.mindzy.controller;

import com.luizmatoso.mindzy.dto.LoginUserDTO;
import com.luizmatoso.mindzy.dto.RegisterUserDTO;
import com.luizmatoso.mindzy.dto.VerifyUserDTO;
import com.luizmatoso.mindzy.model.User;
import com.luizmatoso.mindzy.responses.LoginResponse;
import com.luizmatoso.mindzy.service.AuthenticationService;
import com.luizmatoso.mindzy.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService){
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDTO registerUserDTO){
        User registeredUser = authenticationService.signup(registerUserDTO);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/signin")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginUserDTO loginUserDTO){
        User authenticated = authenticationService.authenticate(loginUserDTO);
        String jwtToken = jwtService.generateToken(authenticated);
        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDTO verifyUserDTO){
        try{
            authenticationService.verifyUser(verifyUserDTO);
            return ResponseEntity.ok("Conta verificada com sucesso.");
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email){
        try{
            authenticationService.resendVerificationCode(email);
            return ResponseEntity.ok("Código de verificação enviado");
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
