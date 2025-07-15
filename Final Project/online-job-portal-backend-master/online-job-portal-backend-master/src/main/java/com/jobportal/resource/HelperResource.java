package com.jobportal.resource;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.jobportal.utility.Constants.JobApplicationStatus;
import com.jobportal.utility.Constants.JobExperienceLevel;
import com.jobportal.utility.Constants.JobType;
import com.jobportal.utility.Constants.SalaryRange;
import com.jobportal.utility.Constants.UserRole;

@Component
public class HelperResource {

	public ResponseEntity<List<String>> fetchAllUserRoles() {

		List<String> response = new ArrayList<>();

		for (UserRole role : UserRole.values()) {
			response.add(role.value());
		}

		return new ResponseEntity<List<String>>(response, HttpStatus.OK);
	}

	public ResponseEntity<List<String>> fetchAllJobTypes() {

		List<String> response = new ArrayList<>();

		for (JobType type : JobType.values()) {
			response.add(type.value());
		}

		return new ResponseEntity<List<String>>(response, HttpStatus.OK);
	}

	public ResponseEntity<List<String>> fetchAllJobApplicationStatus() {

		List<String> response = new ArrayList<>();

		for (JobApplicationStatus status : JobApplicationStatus.values()) {
			response.add(status.value());
		}

		return new ResponseEntity<List<String>>(response, HttpStatus.OK);
	}

	public ResponseEntity<List<String>> fetchAllJobExperiences() {

		List<String> response = new ArrayList<>();

		for (JobExperienceLevel level : JobExperienceLevel.values()) {
			response.add(level.value());
		}

		return new ResponseEntity<List<String>>(response, HttpStatus.OK);
	}

	public ResponseEntity<List<String>> fetchAllJobSalaryRange() {

		List<String> response = new ArrayList<>();

		for (SalaryRange range : SalaryRange.values()) {
			response.add(range.value());
		}

		return new ResponseEntity<List<String>>(response, HttpStatus.OK);
	}

}
