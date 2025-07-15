package com.jobportal.resource;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.jobportal.dto.CommonApiResponse;
import com.jobportal.dto.JobApplicationResponse;
import com.jobportal.entity.Job;
import com.jobportal.entity.JobApplication;
import com.jobportal.entity.User;
import com.jobportal.exception.JobApplicationSaveException;
import com.jobportal.service.JobApplicationService;
import com.jobportal.service.JobService;
import com.jobportal.service.UserService;
import com.jobportal.utility.Constants.JobApplicationStatus;
import com.jobportal.utility.Helper;

@Component
public class JobApplicationResource {

	private final Logger LOG = LoggerFactory.getLogger(UserResource.class);

	@Autowired
	private JobService jobService;

	@Autowired
	private JobApplicationService jobApplicationService;

	@Autowired
	private UserService userService;

	public ResponseEntity<CommonApiResponse> addJobApplication(JobApplication request) {

		LOG.info("Request received for addding job application");

		CommonApiResponse response = new CommonApiResponse();

		if (request == null || request.getJobId() == 0 || request.getEmployeeId() == 0) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Job job = this.jobService.getById(request.getJobId());

		if (job == null) {
			response.setResponseMessage("job not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User employee = this.userService.getUserById(request.getEmployeeId());

		if (employee == null) {
			response.setResponseMessage("employee not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		request.setEmployee(employee);
		request.setJob(job);
		request.setStatus(JobApplicationStatus.APPLIED.value());
		request.setApplicationId(Helper.generateApplicationId());
		request.setDateTime(
				String.valueOf(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()));

		JobApplication savedApplication = this.jobApplicationService.add(request);

		if (savedApplication == null) {
			throw new JobApplicationSaveException("Failed to add job application");
		}

		int totalJobApplicants = job.getApplicationCount();

		job.setApplicationCount(totalJobApplicants + 1);

		Job updatedJob = this.jobService.update(job);

		if (updatedJob == null) {
			throw new JobApplicationSaveException("Failed to add job application");
		}

		response.setResponseMessage("Job Applied Successful!!!");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<JobApplicationResponse> fetchAllJobApplications() {

		LOG.info("Request received for fetching all job applications");

		JobApplicationResponse response = new JobApplicationResponse();

		List<JobApplication> applications = new ArrayList<>();

		applications = this.jobApplicationService.getAll();

		if (CollectionUtils.isEmpty(applications)) {
			response.setResponseMessage("No Job Applications not found!!");
			response.setSuccess(false);

			return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.OK);
		}

		response.setApplications(applications);
		response.setResponseMessage("Job Application Fetched Successful");
		response.setSuccess(true);

		return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<JobApplicationResponse> fetchAllJobApplicationsByEmployee(int employeeId) {

		LOG.info("Request received for fetching all job applications by employee id");

		JobApplicationResponse response = new JobApplicationResponse();

		if (employeeId == 0) {
			response.setResponseMessage("employee not found");
			response.setSuccess(false);

			return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User employee = this.userService.getUserById(employeeId);

		if (employee == null) {
			response.setResponseMessage("employee not found");
			response.setSuccess(false);

			return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.BAD_REQUEST);
		}

		List<JobApplication> applications = new ArrayList<>();

		applications = this.jobApplicationService.getByEmployee(employee);

		if (CollectionUtils.isEmpty(applications)) {
			response.setResponseMessage("No Job Applications not found!!");
			response.setSuccess(false);

			return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.OK);
		}

		response.setApplications(applications);
		response.setResponseMessage("Job Application Fetched Successful");
		response.setSuccess(true);

		return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<JobApplicationResponse> fetchAllJobApplicationsByEmployer(int employerId) {

		LOG.info("Request received for fetching all job applications by employer id");

		JobApplicationResponse response = new JobApplicationResponse();

		if (employerId == 0) {
			response.setResponseMessage("employer not found");
			response.setSuccess(false);

			return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User employer = this.userService.getUserById(employerId);

		if (employer == null) {
			response.setResponseMessage("employer not found");
			response.setSuccess(false);

			return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.BAD_REQUEST);
		}

		List<JobApplication> applications = new ArrayList<>();

		applications = this.jobApplicationService.getByEmployeeAndStatus(employer,
				Arrays.asList(JobApplicationStatus.APPLIED.value(), JobApplicationStatus.REJECTED.value(),
						JobApplicationStatus.SHORTLISTED.value()));

		if (CollectionUtils.isEmpty(applications)) {
			response.setResponseMessage("No Job Applications not found!!");
			response.setSuccess(false);

			return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.OK);
		}

		response.setApplications(applications);
		response.setResponseMessage("Job Application Fetched Successful");
		response.setSuccess(true);

		return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<JobApplicationResponse> fetchAllJobApplicationsByEmployerAndStatus(int employerId,
			String status) {

		LOG.info("Request received for fetching all job applications by employer id and status");

		JobApplicationResponse response = new JobApplicationResponse();

		if (employerId == 0 || status == null) {
			response.setResponseMessage("employer not found");
			response.setSuccess(false);

			return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User employer = this.userService.getUserById(employerId);

		if (employer == null) {
			response.setResponseMessage("employer not found");
			response.setSuccess(false);

			return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.BAD_REQUEST);
		}

		List<JobApplication> applications = new ArrayList<>();

		applications = this.jobApplicationService.getByEmployeeAndStatus(employer, Arrays.asList(status));

		if (CollectionUtils.isEmpty(applications)) {
			response.setResponseMessage("No Job Applications not found!!");
			response.setSuccess(false);

			return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.OK);
		}

		response.setApplications(applications);
		response.setResponseMessage("Job Application Fetched Successful");
		response.setSuccess(true);

		return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<CommonApiResponse> updateJobApplicationStatus(JobApplication request) {

		LOG.info("Request received for updating the job application");

		CommonApiResponse response = new CommonApiResponse();

		if (request == null || request.getId() == 0 || request.getStatus() == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		JobApplication jobApplication = this.jobApplicationService.getById(request.getId());

		if (jobApplication == null) {
			response.setResponseMessage("job application not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		jobApplication.setStatus(request.getStatus());

		JobApplication savedApplication = this.jobApplicationService.update(jobApplication);

		if (savedApplication == null) {
			throw new JobApplicationSaveException("Failed to update the job application status");
		}

		response.setResponseMessage("Job Application Status Updated Successful!!!");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<JobApplicationResponse> fetchAllJobApplicationsByJob(int jobId) {

		LOG.info("Request received for fetching all job applications by job id");

		JobApplicationResponse response = new JobApplicationResponse();

		if (jobId == 0) {
			response.setResponseMessage("job not found");
			response.setSuccess(false);

			return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Job job = this.jobService.getById(jobId);

		if (job == null) {
			response.setResponseMessage("job not found");
			response.setSuccess(false);

			return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.BAD_REQUEST);
		}

		List<JobApplication> applications = new ArrayList<>();

		applications = this.jobApplicationService.getByJob(job);

		if (CollectionUtils.isEmpty(applications)) {
			response.setResponseMessage("No Job Applications not found!!");
			response.setSuccess(false);

			return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.OK);
		}

		response.setApplications(applications);
		response.setResponseMessage("Job Application Fetched Successful");
		response.setSuccess(true);

		return new ResponseEntity<JobApplicationResponse>(response, HttpStatus.OK);
	}

}
