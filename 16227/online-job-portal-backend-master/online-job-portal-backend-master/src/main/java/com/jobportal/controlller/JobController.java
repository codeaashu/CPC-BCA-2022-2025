package com.jobportal.controlller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.dto.CommonApiResponse;
import com.jobportal.dto.JobAddRequest;
import com.jobportal.dto.JobResponse;
import com.jobportal.resource.JobResource;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api/job")
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {

	@Autowired
	private JobResource jobResource;

	@PostMapping("/add")
	@Operation(summary = "Api to post the Job")
	public ResponseEntity<CommonApiResponse> registerAdmin(JobAddRequest request) {
		return jobResource.addJob(request);
	}

	@GetMapping("/fetch/all")
	@Operation(summary = "Api to get all posted job")
	public ResponseEntity<JobResponse> fetchAllPostedJob() {
		return jobResource.fetchAllPostedJob();
	}

	@GetMapping("/search")
	@Operation(summary = "Api to search posted jobs")
	public ResponseEntity<JobResponse> searchJobs(@RequestParam("categoryId") int categoryId,
			@RequestParam("jobType") String type, @RequestParam("salaryRange") String salaryRange) {
		return jobResource.searchJobs(categoryId, type, salaryRange);
	}
	
	@GetMapping("/fetch")
	@Operation(summary = "Api to get Job by id")
	public ResponseEntity<JobResponse> searchJobs(@RequestParam("jobId") int jobId) {
		return jobResource.getJobById(jobId);
	}
	
	@GetMapping("/fetch/employer-wise")
	@Operation(summary = "Api to get Jobs using employer")
	public ResponseEntity<JobResponse> getJobsByEmployer(@RequestParam("employerId") int employerId) {
		return jobResource.getJobByEmployerId(employerId);
	}
	
	@DeleteMapping("delete")
	@Operation(summary = "Api to delete the job")
	public ResponseEntity<CommonApiResponse> deleteJob(@RequestParam("jobId") int jobId) {
		return jobResource.deleteJob(jobId);
	}
	
	@GetMapping(value = "/{companyLogo}", produces = "image/*")
	@Operation(summary = "Api to get the company logo")
	public void fetchFoodImage(@PathVariable("companyLogo") String companyLogo, HttpServletResponse resp) {

		this.jobResource.fetch(companyLogo, resp);

	}

}
