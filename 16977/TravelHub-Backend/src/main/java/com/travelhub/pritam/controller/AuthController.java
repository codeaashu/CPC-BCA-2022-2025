package com.travelhub.pritam.controller;


import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.travelhub.pritam.dto.AuthRequest;
import com.travelhub.pritam.dto.AuthResponse;
import com.travelhub.pritam.dto.CreateUserRequest;
import com.travelhub.pritam.model.User;
import com.travelhub.pritam.service.IUserService;
import com.travelhub.pritam.service.JwtService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class AuthController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@PostMapping("/register")
	public ResponseEntity<AuthResponse> register(@Valid @RequestBody CreateUserRequest request) {
		User user = userService.saveUser(request);
		AuthRequest authRequest = new AuthRequest(request.getUsername(), request.getPassword());
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
				);
		
		 UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
		
		final String token = jwtService.generateToken(user);
		return ResponseEntity.ok(new AuthResponse(token));
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request){
		authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        User user = userService.getByUsername(userDetails.getUsername()).orElseThrow(()-> new RuntimeException("User not found!"));
        final String token = jwtService.generateToken(user);
        return ResponseEntity.ok(new AuthResponse(token));
	}
	
}
