package com.jobportal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.dao.JobApplicationDao;
import com.jobportal.entity.Job;
import com.jobportal.entity.JobApplication;
import com.jobportal.entity.User;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {

	@Autowired
	private JobApplicationDao jobApplicationDao;

	@Override
	public JobApplication add(JobApplication jobApplication) {
		return jobApplicationDao.save(jobApplication);
	}

	@Override
	public JobApplication update(JobApplication jobApplication) {
		return jobApplicationDao.save(jobApplication);
	}

	@Override
	public JobApplication getById(int jobApplicationId) {

		Optional<JobApplication> optionalJobApplication = this.jobApplicationDao.findById(jobApplicationId);

		if (optionalJobApplication.isPresent()) {
			return optionalJobApplication.get();
		}

		return null;
	}

	@Override
	public List<JobApplication> getAll() {
		return jobApplicationDao.findAll();
	}

	@Override
	public List<JobApplication> getByEmployeeAndStatus(User employee, List<String> status) {
		return jobApplicationDao.findByEmployerAndStatus(employee, status);
	}

	@Override
	public List<JobApplication> getByEmployee(User employee) {
		return jobApplicationDao.findByEmployee(employee);
	}

	@Override
	public List<JobApplication> getByJob(Job job) {
		// TODO Auto-generated method stub
		return jobApplicationDao.findByJob(job);
	}

	
	
}
