package com.jobportal.resource;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.FileCopyUtils;

import com.jobportal.dto.CommonApiResponse;
import com.jobportal.dto.JobAddRequest;
import com.jobportal.dto.JobResponse;
import com.jobportal.dto.RegisterUserRequestDto;
import com.jobportal.entity.Address;
import com.jobportal.entity.Job;
import com.jobportal.entity.JobCategory;
import com.jobportal.entity.User;
import com.jobportal.exception.JobSaveFailedException;
import com.jobportal.exception.UserSaveFailedException;
import com.jobportal.service.AddressService;
import com.jobportal.service.JobCategoryService;
import com.jobportal.service.JobService;
import com.jobportal.service.StorageService;
import com.jobportal.service.UserService;
import com.jobportal.utility.Constants.ActiveStatus;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

@Component
@Transactional
public class JobResource {

	private final Logger LOG = LoggerFactory.getLogger(JobResource.class);

	@Autowired
	private JobService jobService;

	@Autowired
	private JobCategoryService jobCategoryService;

	@Autowired
	private UserService userService;

	@Autowired
	private StorageService storageService;

	@Autowired
	private AddressService addressService;

	public ResponseEntity<CommonApiResponse> addJob(JobAddRequest request) {

		LOG.info("request received for Job add");

		CommonApiResponse response = new CommonApiResponse();

		if (request == null || request.getJobCategoryId() == 0 || request.getEmployerId() == 0) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Address address = JobAddRequest.toAddressEntity(request);

		Address addedAddress = this.addressService.addUserAddress(address);

		if (addedAddress == null) {
			throw new UserSaveFailedException("Failed to register User");
		}

		Job job = JobAddRequest.toJobEntity(request);
		job.setAddress(addedAddress);

		JobCategory jobCategory = this.jobCategoryService.getJobCategoryById(request.getJobCategoryId());

		if (jobCategory == null) {
			response.setResponseMessage("Job Category not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User employer = this.userService.getUserById(request.getEmployerId());

		if (employer == null) {
			response.setResponseMessage("Employer not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		job.setEmployer(employer);
		job.setCategory(jobCategory);

		// store company logo image in Image Folder and give name to store in database
		String jobCompanyLogo = storageService.storeCompanyLogo(request.getCompanyLogo());

		job.setCompanyLogo(jobCompanyLogo);
		job.setDatePosted(
				String.valueOf(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()));
		job.setStatus(ActiveStatus.ACTIVE.value());

		Job postedJob = this.jobService.add(job);

		if (postedJob == null) {
			throw new JobSaveFailedException("Failed to post the Job");
		}

		response.setResponseMessage("Job Posted successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<JobResponse> fetchAllPostedJob() {

		LOG.info("request received for fetching all posted job");

		JobResponse response = new JobResponse();

		List<Job> jobs = this.jobService.getAllByStatus(Arrays.asList(ActiveStatus.ACTIVE.value()));

		if (CollectionUtils.isEmpty(jobs)) {
			response.setResponseMessage("No Jobs Found");
			response.setSuccess(false);

			return new ResponseEntity<JobResponse>(response, HttpStatus.OK);
		}

		response.setJobs(jobs);
		response.setResponseMessage("Jobs Fetched Successful");
		response.setSuccess(true);

		return new ResponseEntity<JobResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<JobResponse> searchJobs(int categoryId, String type, String salaryRange) {

		LOG.info("request received for searching the jobs");

		JobResponse response = new JobResponse();

		if (categoryId == 0 || type == null || salaryRange == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<JobResponse>(response, HttpStatus.BAD_REQUEST);
		}

		JobCategory category = this.jobCategoryService.getJobCategoryById(categoryId);

		if (category == null) {
			response.setResponseMessage("Category not found");
			response.setSuccess(false);

			return new ResponseEntity<JobResponse>(response, HttpStatus.BAD_REQUEST);
		}

		List<Job> jobs = this.jobService.searchJobByCategoryAndTypeAndSalaryRangeAndStatus(category, type, salaryRange,
				Arrays.asList(ActiveStatus.ACTIVE.value()));

		if (CollectionUtils.isEmpty(jobs)) {
			response.setResponseMessage("No Jobs Found");
			response.setSuccess(false);

			return new ResponseEntity<JobResponse>(response, HttpStatus.OK);
		}

		response.setJobs(jobs);
		response.setResponseMessage("Jobs Fetched Successful");
		response.setSuccess(true);

		return new ResponseEntity<JobResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<JobResponse> getJobById(int jobId) {

		LOG.info("request received for Job by using job id");

		JobResponse response = new JobResponse();

		if (jobId == 0) {
			response.setResponseMessage("job id not found");
			response.setSuccess(false);

			return new ResponseEntity<JobResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Job job = this.jobService.getById(jobId);

		if (job == null) {
			response.setResponseMessage("Job not found");
			response.setSuccess(false);

			return new ResponseEntity<JobResponse>(response, HttpStatus.OK);
		}

		response.setJobs(Arrays.asList(job));
		response.setResponseMessage("Job Fetched Successful");
		response.setSuccess(true);

		return new ResponseEntity<JobResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<JobResponse> getJobByEmployerId(int employerId) {

		LOG.info("request received for fetching the jobs by employer id");

		JobResponse response = new JobResponse();

		if (employerId == 0) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<JobResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User employer = this.userService.getUserById(employerId);

		if (employer == null) {
			response.setResponseMessage("Employer not found");
			response.setSuccess(false);

			return new ResponseEntity<JobResponse>(response, HttpStatus.BAD_REQUEST);
		}

		List<Job> jobs = this.jobService.getByEmployerAndStatus(employer, Arrays.asList(ActiveStatus.ACTIVE.value()));

		if (CollectionUtils.isEmpty(jobs)) {
			response.setResponseMessage("No Jobs Found");
			response.setSuccess(false);

			return new ResponseEntity<JobResponse>(response, HttpStatus.OK);
		}

		response.setJobs(jobs);
		response.setResponseMessage("Jobs Fetched Successful");
		response.setSuccess(true);

		return new ResponseEntity<JobResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<CommonApiResponse> deleteJob(int jobId) {

		CommonApiResponse response = new CommonApiResponse();

		if (jobId == 0) {
			response.setResponseMessage("job id is missing");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Job job = this.jobService.getById(jobId);

		if (job == null) {
			response.setResponseMessage("Job not found");
			response.setSuccess(false);
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		job.setStatus(ActiveStatus.DEACTIVATED.value());

		Job deletedJob = this.jobService.update(job);

		if (deletedJob == null) {
			throw new JobSaveFailedException("Failed to delete the job");
		}

		response.setResponseMessage("Job Deleted Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public void fetch(String companyLogo, HttpServletResponse resp) {

		Resource resource = storageService.loadCompanyLogo(companyLogo);
		if (resource != null) {
			try (InputStream in = resource.getInputStream()) {
				ServletOutputStream out = resp.getOutputStream();
				FileCopyUtils.copy(in, out);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}

}
