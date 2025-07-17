package com.jobportal.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobportal.entity.Job;
import com.jobportal.entity.JobCategory;
import com.jobportal.entity.User;

@Repository
public interface JobDao extends JpaRepository<Job, Integer> {

	List<Job> findByStatusIn(List<String> status);

	List<Job> findByEmployerAndStatusIn(User employer, List<String> status);

	List<Job> findByCategoryAndStatusIn(JobCategory jobCategory, List<String> status);

	List<Job> findByTitleContainingIgnoreCaseAndStatusIn(String title, List<String> status);

	List<Job> findByCategoryAndJobTypeAndSalaryRangeAndStatusIn(JobCategory jobCategory, String jobType,
			String salaryRange, List<String> status);

}
