package com.travelhub.pritam.service;

import java.util.List;
import java.util.Optional;

import com.travelhub.pritam.dto.CreateUserRequest;
import com.travelhub.pritam.dto.UserResponseDTO;
import com.travelhub.pritam.model.User;

public interface IUserService {
	public User saveUser(CreateUserRequest request);
	public Optional<User> getByUsername(String username);
	public List<UserResponseDTO> getAllUsers();
	public UserResponseDTO blockUser(Long userId);
	public UserResponseDTO unblockUser(Long userId);
	public List<UserResponseDTO> getAllSellers();
	public List<UserResponseDTO> getAllBuyers();
}
