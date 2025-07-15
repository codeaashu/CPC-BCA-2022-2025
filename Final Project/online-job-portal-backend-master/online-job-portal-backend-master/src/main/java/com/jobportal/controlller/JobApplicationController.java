package com.jobportal.controlller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.dto.CommonApiResponse;
import com.jobportal.dto.JobApplicationResponse;
import com.jobportal.entity.JobApplication;
import com.jobportal.resource.JobApplicationResource;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/job/application")
@CrossOrigin(origins = "http://localhost:3000")
public class JobApplicationController {

	@Autowired
	private JobApplicationResource jobApplicationResource;

	@PostMapping("/add")
	@Operation(summary = "Api to apply for Job")
	public ResponseEntity<CommonApiResponse> registerAdmin(@RequestBody JobApplication request) {
		return jobApplicationResource.addJobApplication(request);
	}

	@GetMapping("/fetch/all")
	@Operation(summary = "Api to fetch all the job applications")
	public ResponseEntity<JobApplicationResponse> fetchAllJobApplications() {
		return jobApplicationResource.fetchAllJobApplications();
	}

	@GetMapping("/fetch/all/employee")
	@Operation(summary = "Api to fetch all the job applications by employee")
	public ResponseEntity<JobApplicationResponse> fetchAllJobApplicationsByEmployee(
			@RequestParam("employeeId") int employeeId) {
		return jobApplicationResource.fetchAllJobApplicationsByEmployee(employeeId);
	}
	
	@GetMapping("/fetch/all/employer")
	@Operation(summary = "Api to fetch all the job applications by employer")
	public ResponseEntity<JobApplicationResponse> fetchAllJobApplicationsByEmployer(
			@RequestParam("employerId") int employerId) {
		return jobApplicationResource.fetchAllJobApplicationsByEmployer(employerId);
	}

	@GetMapping("/fetch/all/job-wise")
	@Operation(summary = "Api to fetch all the job applications by Job")
	public ResponseEntity<JobApplicationResponse> fetchAllJobApplicationsByJob(
			@RequestParam("jobId") int jobId) {
		return jobApplicationResource.fetchAllJobApplicationsByJob(jobId);
	}
	
	@GetMapping("/fetch/status-wise/employer")
	@Operation(summary = "Api to fetch all the job applications by employer and status")
	public ResponseEntity<JobApplicationResponse> fetchAllJobApplicationsByEmployerAndStatus(
			@RequestParam("employerId") int employerId, @RequestParam("status") String status) {
		return jobApplicationResource.fetchAllJobApplicationsByEmployerAndStatus(employerId, status);
	}
	
	@PutMapping("/update/status")
	@Operation(summary = "Api to update the job application status")
	public ResponseEntity<CommonApiResponse> fetchAllJobApplicationsByEmployee(@RequestBody JobApplication request) {
		return jobApplicationResource.updateJobApplicationStatus(request);
	}

}
