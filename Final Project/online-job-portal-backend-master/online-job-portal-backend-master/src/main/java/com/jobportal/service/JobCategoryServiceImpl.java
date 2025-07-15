package com.jobportal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.dao.JobCategoryDao;
import com.jobportal.entity.JobCategory;

@Service
public class JobCategoryServiceImpl implements JobCategoryService {

	@Autowired
	private JobCategoryDao categoryDao;

	@Override
	public JobCategory addJobCategory(JobCategory JobCategory) {
		return categoryDao.save(JobCategory);
	}

	@Override
	public JobCategory updateJobCategory(JobCategory JobCategory) {
		return categoryDao.save(JobCategory);
	}

	@Override
	public JobCategory getJobCategoryById(int JobCategory) {

		Optional<JobCategory> optionalCategory = this.categoryDao.findById(JobCategory);

		if (optionalCategory.isPresent()) {
			return optionalCategory.get();
		} else {
			return null;
		}

	}

	@Override
	public List<JobCategory> getCategoriesByStatusIn(List<String> status) {
		return this.categoryDao.findByStatusIn(status);
	}

}
