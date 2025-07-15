package com.travelhub.pritam.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequest {
	
	@NotBlank(message="Username cannot be empty")
	private String username;
	
	@Email(message="Please provide a valid email address")
	private String email;
	
	private String password;
	private String phoneNumber;
	private String role;
	
}
