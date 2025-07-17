package com.jobportal.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobportal.entity.UserWorkExperience;

@Repository
public interface UserWorkExperienceDao extends JpaRepository<UserWorkExperience, Integer> {

}
