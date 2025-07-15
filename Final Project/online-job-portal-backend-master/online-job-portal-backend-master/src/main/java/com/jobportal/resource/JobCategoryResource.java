package com.jobportal.resource;

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

import com.jobportal.dto.CategoryResponseDto;
import com.jobportal.dto.CommonApiResponse;
import com.jobportal.entity.Job;
import com.jobportal.entity.JobCategory;
import com.jobportal.exception.CategorySaveFailedException;
import com.jobportal.service.JobCategoryService;
import com.jobportal.service.JobService;
import com.jobportal.utility.Constants.ActiveStatus;

@Component
public class JobCategoryResource {

	private final Logger LOG = LoggerFactory.getLogger(UserResource.class);

	@Autowired
	private JobCategoryService categoryService;

	@Autowired
	private JobService jobService;

	public ResponseEntity<CommonApiResponse> addCategory(JobCategory category) {

		LOG.info("Request received for add category");

		CommonApiResponse response = new CommonApiResponse();

		if (category == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		category.setStatus(ActiveStatus.ACTIVE.value());

		JobCategory savedCategory = this.categoryService.addJobCategory(category);

		if (savedCategory == null) {
			throw new CategorySaveFailedException("Failed to add category");
		}

		response.setResponseMessage("Category Added Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CommonApiResponse> updateCategory(JobCategory category) {

		LOG.info("Request received for add job category");

		CommonApiResponse response = new CommonApiResponse();

		if (category == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		category.setStatus(ActiveStatus.ACTIVE.value());
		JobCategory savedCategory = this.categoryService.updateJobCategory(category);

		if (savedCategory == null) {
			throw new CategorySaveFailedException("Failed to update category");
		}

		response.setResponseMessage("Category Updated Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CategoryResponseDto> fetchAllCategory() {

		LOG.info("Request received for fetching all categories");

		CategoryResponseDto response = new CategoryResponseDto();

		List<JobCategory> categories = new ArrayList<>();

		categories = this.categoryService.getCategoriesByStatusIn(Arrays.asList(ActiveStatus.ACTIVE.value()));

		if (CollectionUtils.isEmpty(categories)) {
			response.setResponseMessage("No Categories found");
			response.setSuccess(false);

			return new ResponseEntity<CategoryResponseDto>(response, HttpStatus.OK);
		}

		response.setCategories(categories);
		response.setResponseMessage("Category fetched successful");
		response.setSuccess(true);

		return new ResponseEntity<CategoryResponseDto>(response, HttpStatus.OK);
	}

	public ResponseEntity<CommonApiResponse> deleteCategory(int categoryId) {

		LOG.info("Request received for deleting Job category");

		CommonApiResponse response = new CommonApiResponse();

		if (categoryId == 0) {
			response.setResponseMessage("missing category Id");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		JobCategory category = this.categoryService.getJobCategoryById(categoryId);

		if (category == null) {
			response.setResponseMessage("category not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		List<Job> jobs = this.jobService.getAllByCategoryAndStatusIn(category,
				Arrays.asList(ActiveStatus.ACTIVE.value()));

		category.setStatus(ActiveStatus.DEACTIVATED.value());
		JobCategory deletedCategory = this.categoryService.updateJobCategory(category);

		if (deletedCategory == null) {
			throw new CategorySaveFailedException("Failed to delete the Job category");
		}

		if (CollectionUtils.isEmpty(jobs)) {
			response.setResponseMessage("Job Category Deleted Successful");
			response.setSuccess(true);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		for (Job job : jobs) {
			job.setStatus(ActiveStatus.DEACTIVATED.value());
		}

		List<Job> deletedJobs = this.jobService.updateAll(jobs);

		if (CollectionUtils.isEmpty(deletedJobs)) {
			throw new CategorySaveFailedException("Failed to delete the Job category");
		}

		response.setResponseMessage("Job Category Deleted Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
	}

}
