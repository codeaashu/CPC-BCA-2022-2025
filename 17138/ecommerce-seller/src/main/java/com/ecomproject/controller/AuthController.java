package com.ecomproject.controller;

import com.ecomproject.model.User;
import com.ecomproject.model.VerificationCode;
import com.ecomproject.repository.UserRepository;
import com.ecomproject.request.LoginOtpRequest;
import com.ecomproject.request.LoginRequest;
import com.ecomproject.response.ApiResponse;
import com.ecomproject.response.AuthResponse;
import com.ecomproject.response.SignupRequest;
import com.ecomproject.role.UserRole;
import com.ecomproject.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest req) throws Exception {

        String jwt=authService.createUser(req);

        AuthResponse res=new AuthResponse();
        res.setJwt(jwt);
        res.setMessage("registered successfully");
        res.setRole(UserRole.ROLE_CUSTOMER);


        return ResponseEntity.ok(res);
    }

    @PostMapping("/sent/loginsignupotp")
    public ResponseEntity<ApiResponse> sentOtpHandler(
            @RequestBody LoginOtpRequest req) throws Exception {

        authService.sentLoginOtp(req.getEmail(), req.getRole());

        ApiResponse res=new ApiResponse();

        res.setMessage("Otp Sent successfully");


        return ResponseEntity.ok(res);
    }

    @PostMapping("/signing")
    public ResponseEntity<AuthResponse> loginHandler(
            @RequestBody LoginRequest req) throws Exception {

        AuthResponse authResponse = authService.signing(req);


        return ResponseEntity.ok(authResponse);
    }
}
