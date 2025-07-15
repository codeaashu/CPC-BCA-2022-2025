package com.travelhub.pritam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.travelhub.pritam.dto.HotelResponseDTO;
import com.travelhub.pritam.dto.UserDto;
import com.travelhub.pritam.model.User;
import com.travelhub.pritam.repository.UserRepository;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/profile")
	public ResponseEntity<UserDto> getProfile(@AuthenticationPrincipal UserDetails userDetails ){
		User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(()-> new RuntimeException("User not found"));
		UserDto udto = new UserDto();
		udto.setUsername(user.getUsername());
		udto.setEmail(user.getEmail());
		udto.setPhoneNumber(user.getPhoneNumber());
		udto.setRole(user.getRole().toString());
		return ResponseEntity.ok(udto);
	}
	
	
}
