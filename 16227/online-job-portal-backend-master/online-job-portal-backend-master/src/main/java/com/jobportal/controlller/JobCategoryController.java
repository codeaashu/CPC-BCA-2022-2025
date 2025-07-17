package com.jobportal.controlller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.dto.CategoryResponseDto;
import com.jobportal.dto.CommonApiResponse;
import com.jobportal.entity.JobCategory;
import com.jobportal.resource.JobCategoryResource;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/job/category")
@CrossOrigin(origins = "http://localhost:3000")
public class JobCategoryController {

	@Autowired
	private JobCategoryResource categoryResource;

	@PostMapping("/add")
	@Operation(summary = "Api to add job category")
	public ResponseEntity<CommonApiResponse> addCategory(@RequestBody JobCategory category) {
		return categoryResource.addCategory(category);
	}

	@PutMapping("/update")
	@Operation(summary = "Api to update job category")
	public ResponseEntity<CommonApiResponse> updateCategory(@RequestBody JobCategory category) {
		return categoryResource.updateCategory(category);
	}

	@GetMapping("/fetch/all")
	@Operation(summary = "Api to fetch all job category")
	public ResponseEntity<CategoryResponseDto> fetchAllCategory() {
		return categoryResource.fetchAllCategory();
	}

	@DeleteMapping("/delete")
	@Operation(summary = "Api to delete job category all its job posted")
	public ResponseEntity<CommonApiResponse> deleteCategory(@RequestParam("categoryId") int categoryId) {
		return categoryResource.deleteCategory(categoryId);
	}

}
