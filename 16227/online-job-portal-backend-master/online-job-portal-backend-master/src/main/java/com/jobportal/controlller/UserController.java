package com.jobportal.controlller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.dto.CommonApiResponse;
import com.jobportal.dto.RegisterUserRequestDto;
import com.jobportal.dto.UpdateUserProfileRequest;
import com.jobportal.dto.UserLoginRequest;
import com.jobportal.dto.UserLoginResponse;
import com.jobportal.dto.UserResponseDto;
import com.jobportal.entity.UserEducation;
import com.jobportal.entity.UserSkill;
import com.jobportal.entity.UserWorkExperience;
import com.jobportal.resource.UserResource;
import com.lowagie.text.DocumentException;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private UserResource userResource;

	// RegisterUserRequestDto, we will set only email, password & role from UI
	@PostMapping("/admin/register")
	@Operation(summary = "Api to register Admin")
	public ResponseEntity<CommonApiResponse> registerAdmin(@RequestBody RegisterUserRequestDto request) {
		return userResource.registerAdmin(request);
	}

	// for customer and restaurant register
	@PostMapping("register")
	@Operation(summary = "Api to register customer or restaurant user")
	public ResponseEntity<CommonApiResponse> registerUser(@RequestBody RegisterUserRequestDto request) {
		return this.userResource.registerUser(request);
	}

	@PostMapping("login")
	@Operation(summary = "Api to login any User")
	public ResponseEntity<UserLoginResponse> login(@RequestBody UserLoginRequest userLoginRequest) {
		return userResource.login(userLoginRequest);
	}

	@GetMapping("/fetch/role-wise")
	@Operation(summary = "Api to get Users By Role")
	public ResponseEntity<UserResponseDto> fetchAllUsersByRole(@RequestParam("role") String role) {
		return userResource.getUsersByRole(role);
	}

	@DeleteMapping("delete")
	@Operation(summary = "Api to delete the user")
	public ResponseEntity<CommonApiResponse> deleteUser(@RequestParam("userId") int userId) {
		return userResource.deleteUser(userId);
	}

	@GetMapping("/fetch")
	@Operation(summary = "Api to get User by using user id")
	public ResponseEntity<UserResponseDto> fetchUserById(@RequestParam("userId") int userId) {
		return userResource.fetchUserById(userId);
	}

	@PutMapping("/profile/add")
	@Operation(summary = "Api to update the user profile")
	public ResponseEntity<CommonApiResponse> updateUserProfile(UpdateUserProfileRequest request) {
		return this.userResource.updateUserProfile(request);
	}

	@PutMapping("/profile/skill/update")
	@Operation(summary = "Api to update the user skill")
	public ResponseEntity<CommonApiResponse> updateSkill(@RequestBody UserSkill request) {
		return this.userResource.udpateUserSkill(request);
	}

	@PutMapping("/profile/work-experience/update")
	@Operation(summary = "Api to update the user work experience")
	public ResponseEntity<CommonApiResponse> updateWorkExperience(@RequestBody UserWorkExperience request) {
		return this.userResource.udpateWorkExperience(request);
	}

	@PutMapping("/profile/education/update")
	@Operation(summary = "Api to update the user education detail")
	public ResponseEntity<CommonApiResponse> updateEducationDetail(@RequestBody UserEducation request) {
		return this.userResource.udpateEducation(request);
	}

	@GetMapping(value = "/{userProfilePic}", produces = "image/*")
	@Operation(summary = "Api to get the user profile pic")
	public void fetchFoodImage(@PathVariable("userProfilePic") String userProfilePic, HttpServletResponse resp) {
		this.userResource.fetch(userProfilePic, resp);
	}
	
	@GetMapping("employee/resume/{resumeFileName}/download")
	@Operation(summary =  "Api for downloading the Employee Resume")
	public ResponseEntity<Resource> downloadResume(
			@RequestParam("employeeId") int employeeId,
			@PathVariable("resumeFileName") String resumeFileName,
			HttpServletResponse response) throws DocumentException, IOException {
		return this.userResource.downloadResume(employeeId, resumeFileName, response);
	}

}
