package com.ecomproject.service;

import com.ecomproject.model.User;
import com.ecomproject.request.LoginRequest;
import com.ecomproject.response.AuthResponse;
import com.ecomproject.response.SignupRequest;
import com.ecomproject.role.UserRole;

public interface AuthService {

    void sentLoginOtp(String email, UserRole role) throws Exception;

    String createUser(SignupRequest req) throws Exception;

    AuthResponse signing(LoginRequest req) throws Exception;
}
