package com.travelhub.pritam.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
	
	private String username;
	
	private String email;
	
	private String phoneNumber;
	
	
	private String role;
}
