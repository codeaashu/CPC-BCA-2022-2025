package com.ecomproject.request;

import lombok.Data;

@Data
public class LoginRequest {

    private String email;
    private String otp;
}
