package com.jobportal.service;

import java.util.List;

import com.jobportal.entity.Job;
import com.jobportal.entity.JobApplication;
import com.jobportal.entity.User;

public interface JobApplicationService {

	JobApplication add(JobApplication jobApplication);

	JobApplication update(JobApplication jobApplication);

	JobApplication getById(int jobApplicationId);
	
	List<JobApplication> getAll();
	
	List<JobApplication> getByEmployee(User employee);
	
	List<JobApplication> getByEmployeeAndStatus(User employee, List<String> status);

	List<JobApplication> getByJob(Job job);

}
