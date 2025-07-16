package com.jobportal.resource;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.FileCopyUtils;

import com.jobportal.dto.CommonApiResponse;
import com.jobportal.dto.RegisterUserRequestDto;
import com.jobportal.dto.UpdateUserProfileRequest;
import com.jobportal.dto.UserLoginRequest;
import com.jobportal.dto.UserLoginResponse;
import com.jobportal.dto.UserResponseDto;
import com.jobportal.entity.Address;
import com.jobportal.entity.User;
import com.jobportal.entity.UserEducation;
import com.jobportal.entity.UserProfile;
import com.jobportal.entity.UserSkill;
import com.jobportal.entity.UserWorkExperience;
import com.jobportal.exception.UserSaveFailedException;
import com.jobportal.service.AddressService;
import com.jobportal.service.StorageService;
import com.jobportal.service.UserEducationService;
import com.jobportal.service.UserProfileService;
import com.jobportal.service.UserService;
import com.jobportal.service.UserSkillService;
import com.jobportal.service.UserWorkExperienceService;
import com.jobportal.utility.Constants.ActiveStatus;
import com.jobportal.utility.Constants.UserRole;
import com.jobportal.utility.JwtUtils;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

@Component
@Transactional
public class UserResource {

	private final Logger LOG = LoggerFactory.getLogger(UserResource.class);

	@Autowired
	private UserService userService;

	@Autowired
	private UserProfileService userProfileService;

	@Autowired
	private UserSkillService userSkillService;

	@Autowired
	private UserWorkExperienceService userWorkExperienceService;

	@Autowired
	private UserEducationService userEducationService;

	@Autowired
	private AddressService addressService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private StorageService storageService;

	public ResponseEntity<CommonApiResponse> registerAdmin(RegisterUserRequestDto registerRequest) {

		LOG.info("Request received for Register Admin");

		CommonApiResponse response = new CommonApiResponse();

		if (registerRequest == null) {
			response.setResponseMessage("user is null");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (registerRequest.getEmailId() == null || registerRequest.getPassword() == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User existingUser = this.userService.getUserByEmailAndStatus(registerRequest.getEmailId(),
				ActiveStatus.ACTIVE.value());

		if (existingUser != null) {
			response.setResponseMessage("User already register with this Email");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User user = RegisterUserRequestDto.toUserEntity(registerRequest);

		user.setRole(UserRole.ROLE_ADMIN.value());
		user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
		user.setStatus(ActiveStatus.ACTIVE.value());

		existingUser = this.userService.addUser(user);

		if (existingUser == null) {
			response.setResponseMessage("failed to register admin");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		response.setResponseMessage("Admin registered Successfully");
		response.setSuccess(true);

		LOG.info("Response Sent!!!");

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<CommonApiResponse> registerUser(RegisterUserRequestDto request) {

		LOG.info("Received request for register user");

		CommonApiResponse response = new CommonApiResponse();

		if (request == null) {
			response.setResponseMessage("user is null");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User existingUser = this.userService.getUserByEmailAndStatus(request.getEmailId(), ActiveStatus.ACTIVE.value());

		if (existingUser != null) {
			response.setResponseMessage("User with this Email Id already resgistered!!!");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (request.getRole() == null) {
			response.setResponseMessage("bad request ,Role is missing");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User user = RegisterUserRequestDto.toUserEntity(request);

		Address address = RegisterUserRequestDto.toAddressEntity(request);

		Address addedAddress = this.addressService.addUserAddress(address);

		if (addedAddress == null) {
			throw new UserSaveFailedException("Failed to register User");
		}

		String encodedPassword = passwordEncoder.encode(user.getPassword());

		user.setStatus(ActiveStatus.ACTIVE.value());
		user.setPassword(encodedPassword);
		user.setRegistrationDate(
				String.valueOf(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()));
		user.setAddress(addedAddress);

		existingUser = this.userService.addUser(user);

		if (existingUser == null) {
			throw new UserSaveFailedException("Registration Failed because of Technical issue:(");
		}

		response.setResponseMessage("User registered Successfully");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<UserLoginResponse> login(UserLoginRequest loginRequest) {

		LOG.info("Received request for User Login");

		UserLoginResponse response = new UserLoginResponse();

		if (loginRequest == null) {
			response.setResponseMessage("Missing Input");
			response.setSuccess(false);

			return new ResponseEntity<UserLoginResponse>(response, HttpStatus.BAD_REQUEST);
		}

		String jwtToken = null;
		User user = null;

		List<GrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority(loginRequest.getRole()));

		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmailId(),
					loginRequest.getPassword(), authorities));
		} catch (Exception ex) {
			response.setResponseMessage("Invalid email or password.");
			response.setSuccess(false);
			return new ResponseEntity<UserLoginResponse>(response, HttpStatus.BAD_REQUEST);
		}

		jwtToken = jwtUtils.generateToken(loginRequest.getEmailId());

		user = this.userService.getUserByEmailIdAndRoleAndStatus(loginRequest.getEmailId(), loginRequest.getRole(),
				ActiveStatus.ACTIVE.value());

		// user is authenticated
		if (jwtToken != null) {
			response.setUser(user);
			response.setResponseMessage("Logged in sucessful");
			response.setSuccess(true);
			response.setJwtToken(jwtToken);
			return new ResponseEntity<UserLoginResponse>(response, HttpStatus.OK);
		}

		else {
			response.setResponseMessage("Failed to login");
			response.setSuccess(false);
			return new ResponseEntity<UserLoginResponse>(response, HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<UserResponseDto> getUsersByRole(String role) {

		UserResponseDto response = new UserResponseDto();

		if (role == null) {
			response.setResponseMessage("missing role");
			response.setSuccess(false);
			return new ResponseEntity<UserResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		List<User> users = new ArrayList<>();

		users = this.userService.getUserByRoleAndStatus(role, ActiveStatus.ACTIVE.value());

		if (users.isEmpty()) {
			response.setResponseMessage("No Users Found");
			response.setSuccess(false);
			return new ResponseEntity<UserResponseDto>(response, HttpStatus.OK);
		}

		response.setUsers(users);
		response.setResponseMessage("User Fetched Successfully");
		response.setSuccess(true);

		return new ResponseEntity<UserResponseDto>(response, HttpStatus.OK);
	}

	public ResponseEntity<UserResponseDto> fetchUserById(int userId) {

		UserResponseDto response = new UserResponseDto();

		if (userId == 0) {
			response.setResponseMessage("user id is missing");
			response.setSuccess(false);
			return new ResponseEntity<UserResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		User user = this.userService.getUserById(userId);

		if (user == null) {
			response.setResponseMessage("User not found");
			response.setSuccess(false);
			return new ResponseEntity<UserResponseDto>(response, HttpStatus.OK);
		}

		response.setUsers(Arrays.asList(user));
		response.setResponseMessage("User Fetched Successfully");
		response.setSuccess(true);

		return new ResponseEntity<UserResponseDto>(response, HttpStatus.OK);
	}

	public ResponseEntity<CommonApiResponse> deleteUser(int userId) {

		CommonApiResponse response = new CommonApiResponse();

		if (userId == 0) {
			response.setResponseMessage("user id is missing");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User user = this.userService.getUserById(userId);

		if (user == null) {
			response.setResponseMessage("User not found");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		user.setStatus(ActiveStatus.DEACTIVATED.value());

		User deletedUser = this.userService.updateUser(user);

		if (deletedUser == null) {
			throw new UserSaveFailedException("Failed to delete the user");
		}

		response.setResponseMessage("User Deleted Successfully");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CommonApiResponse> updateUserProfile(UpdateUserProfileRequest request) {

		CommonApiResponse response = new CommonApiResponse();

		if (request == null || request.getUserId() == 0 || request.getResume() == null
				|| request.getProfilePic() == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User user = this.userService.getUserById(request.getUserId());

		if (user == null) {
			response.setResponseMessage("User not found");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		UserProfile profile = new UserProfile();
		profile.setBio(request.getBio());
		profile.setGithubProfileLink(request.getGithubProfileLink());
		profile.setLinkedlnProfileLink(request.getLinkedlnProfileLink());
		profile.setWebsite(request.getWebsite());

		String profilePic = storageService.storeProfilePhoto(request.getProfilePic());

		profile.setProfilePic(profilePic);

		String resume = storageService.storeProfilePhoto(request.getResume());

		profile.setResume(resume);

		UserProfile updatedProfile = this.userProfileService.add(profile);

		if (updatedProfile == null) {
			throw new UserSaveFailedException("Failed to update the User Profile");
		}

		user.setUserProfile(updatedProfile);

		User updatedUser = this.userService.updateUser(user);

		if (updatedUser == null) {
			throw new UserSaveFailedException("Failed to update the User Profile");
		}

		response.setResponseMessage("User Profile Updated successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CommonApiResponse> udpateUserSkill(UserSkill request) {

		CommonApiResponse response = new CommonApiResponse();

		if (request == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User user = this.userService.getUserById(request.getUserId());

		if (user == null) {
			response.setResponseMessage("User not found");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		UserProfile profile = user.getUserProfile();

		if (profile == null) {
			response.setResponseMessage("User Profile not found");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		else {

			List<UserSkill> skills = CollectionUtils.isEmpty(profile.getSkills()) ? null : profile.getSkills();

			if (CollectionUtils.isEmpty(profile.getSkills())) {
				request.setUserProfile(profile);
				UserSkill addedSkill = this.userSkillService.add(request);

				if (addedSkill == null) {
					throw new UserSaveFailedException("Failed to update the User Profile");
				}

				profile.setSkills(Arrays.asList(addedSkill));
			} else {

				request.setUserProfile(profile);
				UserSkill addedSkill = this.userSkillService.add(request);

				if (addedSkill == null) {
					throw new UserSaveFailedException("Failed to update the User Profile");
				}
				skills.add(addedSkill);
				profile.setSkills(skills);
			}
		}

		response.setResponseMessage("User Profile Updated successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CommonApiResponse> udpateWorkExperience(UserWorkExperience request) {

		CommonApiResponse response = new CommonApiResponse();

		if (request == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User user = this.userService.getUserById(request.getUserId());

		if (user == null) {
			response.setResponseMessage("User not found");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		UserProfile profile = user.getUserProfile();

		if (profile == null) {
			response.setResponseMessage("User Profile not found");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		else {

			List<UserWorkExperience> experiences = CollectionUtils.isEmpty(profile.getWorkExperiences()) ? null
					: profile.getWorkExperiences();

			if (CollectionUtils.isEmpty(profile.getWorkExperiences())) {
				request.setUserProfile(profile);
				UserWorkExperience addedExperience = this.userWorkExperienceService.add(request);

				if (addedExperience == null) {
					throw new UserSaveFailedException("Failed to update the User Profile");
				}

				profile.setWorkExperiences(Arrays.asList(addedExperience));
			} else {
				request.setUserProfile(profile);
				UserWorkExperience addedExperience = this.userWorkExperienceService.add(request);

				if (addedExperience == null) {
					throw new UserSaveFailedException("Failed to update the User Profile");
				}
				experiences.add(addedExperience);
				profile.setWorkExperiences(experiences);
			}
		}

		response.setResponseMessage("User Profile Updated successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CommonApiResponse> udpateEducation(UserEducation request) {

		CommonApiResponse response = new CommonApiResponse();

		if (request == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User user = this.userService.getUserById(request.getUserId());

		if (user == null) {
			response.setResponseMessage("User not found");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		UserProfile profile = user.getUserProfile();

		if (profile == null) {
			response.setResponseMessage("User Profile not found");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		else {

			List<UserEducation> educations = CollectionUtils.isEmpty(profile.getEducations()) ? null
					: profile.getEducations();

			if (CollectionUtils.isEmpty(profile.getEducations())) {
				request.setUserProfile(profile);
				UserEducation addedEducation = this.userEducationService.add(request);

				if (addedEducation == null) {
					throw new UserSaveFailedException("Failed to update the User Profile");
				}

				profile.setEducations(Arrays.asList(addedEducation));
			} else {
				request.setUserProfile(profile);
				UserEducation addedEducation = this.userEducationService.add(request);

				if (addedEducation == null) {
					throw new UserSaveFailedException("Failed to update the User Profile");
				}
				educations.add(addedEducation);
				profile.setEducations(educations);
			}
		}

		response.setResponseMessage("User Profile Updated successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public void fetch(String userProfilePic, HttpServletResponse resp) {

		Resource resource = storageService.loadProfilePhoto(userProfilePic);
		if (resource != null) {
			try (InputStream in = resource.getInputStream()) {
				ServletOutputStream out = resp.getOutputStream();
				FileCopyUtils.copy(in, out);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}

	public ResponseEntity<Resource> downloadResume(int employeeId, String resumeFileName, HttpServletResponse response) {

		
		User user = this.userService.getUserById(employeeId);
		
		Resource resource = storageService.loadResume(resumeFileName);
		if (resource == null) {
            // Handle file not found
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + user.getFirstName() + "_Resume\"")
                .body(resource);

	}
	
}
