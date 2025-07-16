package com.jobportal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.dao.JobDao;
import com.jobportal.entity.Job;
import com.jobportal.entity.JobCategory;
import com.jobportal.entity.User;

@Service
public class JobServiceImpl implements JobService {

	@Autowired
	private JobDao jobDao;

	@Override
	public Job add(Job job) {
		return jobDao.save(job);
	}

	@Override
	public Job update(Job job) {
		return jobDao.save(job);
	}

	@Override
	public Job getById(int jobId) {

		Optional<Job> optionalJob = this.jobDao.findById(jobId);

		if (optionalJob.isPresent()) {
			return optionalJob.get();
		}

		return null;
	}

	@Override
	public List<Job> getAllByStatus(List<String> status) {
		return jobDao.findByStatusIn(status);
	}

	@Override
	public List<Job> getByEmployerAndStatus(User employer, List<String> status) {
		return jobDao.findByEmployerAndStatusIn(employer, status);
	}

	@Override
	public List<Job> updateAll(List<Job> jobs) {
		return jobDao.saveAll(jobs);
	}

	@Override
	public List<Job> getAllByCategoryAndStatusIn(JobCategory category, List<String> status) {
		return jobDao.findByCategoryAndStatusIn(category, status);
	}

	@Override
	public List<Job> searchJobNameAndStatusIn(String jobName, List<String> status) {
		return jobDao.findByTitleContainingIgnoreCaseAndStatusIn(jobName, status);
	}

	@Override
	public List<Job> searchJobByCategoryAndTypeAndSalaryRangeAndStatus(JobCategory category, String type,
			String salaryRange, List<String> status) {
		return jobDao.findByCategoryAndJobTypeAndSalaryRangeAndStatusIn(category, type, salaryRange, status);
	}

}
