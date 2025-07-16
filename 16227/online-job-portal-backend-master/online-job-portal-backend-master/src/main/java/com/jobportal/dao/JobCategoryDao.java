package com.jobportal.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobportal.entity.JobCategory;

@Repository
public interface JobCategoryDao extends JpaRepository<JobCategory, Integer> {

	List<JobCategory> findByStatusIn(List<String> status);

}
