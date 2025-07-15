package com.ecomproject.request;

import com.ecomproject.role.UserRole;
import lombok.Data;

@Data
public class LoginOtpRequest {
   private String email;
   private String otp;
   private UserRole role;
}
