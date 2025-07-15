package com.jobportal.controlller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.resource.HelperResource;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/helper")
@CrossOrigin(origins = "http://localhost:3000")
public class HelperController {

	@Autowired
	private HelperResource helperResource;

	@GetMapping("/user/role/fetch/all")
	@Operation(summary = "Api to get all user roles in application")
	public ResponseEntity<List<String>> fetchAllUserRoles() {
		return helperResource.fetchAllUserRoles();
	}

	@GetMapping("/job/type/fetch/all")
	@Operation(summary = "Api to get all job types in application")
	public ResponseEntity<List<String>> fetchAllJobType() {
		return helperResource.fetchAllJobTypes();
	}

	@GetMapping("/job/application/status/fetch/all")
	@Operation(summary = "Api to get all job application status in application")
	public ResponseEntity<List<String>> fetchAllJobApplicationStatus() {
		return helperResource.fetchAllJobApplicationStatus();
	}

	@GetMapping("/job/expereince/fetch/all")
	@Operation(summary = "Api to get all job expereinces in application")
	public ResponseEntity<List<String>> fetchAllJobExperiences() {
		return helperResource.fetchAllJobExperiences();
	}

	@GetMapping("/job/salary/range/fetch/all")
	@Operation(summary = "Api to get all job expereinces in application")
	public ResponseEntity<List<String>> fetchAllJobSalaryRange() {
		return helperResource.fetchAllJobSalaryRange();
	}

}
