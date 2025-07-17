package com.jobportal.dto;

import java.util.ArrayList;
import java.util.List;

import com.jobportal.entity.User;

public class UserResponseDto extends CommonApiResponse {

	private List<User> users = new ArrayList<>();

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

}