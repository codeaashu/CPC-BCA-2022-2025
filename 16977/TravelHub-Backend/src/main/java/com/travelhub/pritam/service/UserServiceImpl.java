package com.travelhub.pritam.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.travelhub.pritam.dto.CreateUserRequest;
import com.travelhub.pritam.dto.UserResponseDTO;
import com.travelhub.pritam.model.Role;
import com.travelhub.pritam.model.User;
import com.travelhub.pritam.repository.UserRepository;
import com.travelhub.pritam.utility.ConversionUtility;

@Service
public class UserServiceImpl implements IUserService {
	
	
	@Autowired
	private ConversionUtility conversionUtility;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Override
	public Optional<User> getByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	

	@Override
	public User saveUser(CreateUserRequest request) {
		User us = new User();
		us.setEmail(request.getEmail());
		us.setUsername(request.getUsername());
		us.setPassword(passwordEncoder.encode(request.getPassword()));
		us.setPhoneNumber(request.getPhoneNumber());
		us.setRole(Role.valueOf(request.getRole().toUpperCase()));
		us.setActive(true);
		return userRepository.save(us);
	}



	@Override
	public List<UserResponseDTO> getAllUsers() {
		List<User> users = userRepository.findAll();
		return users.stream()
		.map(conversionUtility::mapToUserResponseDTO)
		.collect(Collectors.toList());
	}
	
	public UserResponseDTO blockUser(Long userId) {
	    User user = userRepository.findById(userId).orElseThrow();
	    user.setActive(false);
	    user = userRepository.save(user);
	    return conversionUtility.mapToUserResponseDTO(user);
	}

	public UserResponseDTO unblockUser(Long userId) {
	    User user = userRepository.findById(userId).orElseThrow();
	    user.setActive(true);
	    user = userRepository.save(user);
	    return conversionUtility.mapToUserResponseDTO(user);
	}



	@Override
	public List<UserResponseDTO> getAllSellers() {
		List<User> users = userRepository.findByRole(Role.SELLER);
		return users.stream()
		.map(conversionUtility::mapToUserResponseDTO)
		.collect(Collectors.toList());
	}



	@Override
	public List<UserResponseDTO> getAllBuyers() {
		List<User> users = userRepository.findByRole(Role.BUYER);
		return users.stream()
		.map(conversionUtility::mapToUserResponseDTO)
		.collect(Collectors.toList());
	}

}
