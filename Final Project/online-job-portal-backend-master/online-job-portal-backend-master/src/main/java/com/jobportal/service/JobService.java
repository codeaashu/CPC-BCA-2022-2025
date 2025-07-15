package com.jobportal.service;

import java.util.List;

import com.jobportal.entity.Job;
import com.jobportal.entity.JobCategory;
import com.jobportal.entity.User;

public interface JobService {

	Job add(Job job);

	Job update(Job job);

	Job getById(int jobId);
	
	List<Job> getAllByStatus(List<String> status);

	List<Job> getByEmployerAndStatus(User employer, List<String> status);

	List<Job> updateAll(List<Job> jobs);

	List<Job> getAllByCategoryAndStatusIn(JobCategory category, List<String> status);

	List<Job> searchJobNameAndStatusIn(String jobName, List<String> status);

	List<Job> searchJobByCategoryAndTypeAndSalaryRangeAndStatus(JobCategory category, String type, String salaryRange,
			List<String> status);

}
