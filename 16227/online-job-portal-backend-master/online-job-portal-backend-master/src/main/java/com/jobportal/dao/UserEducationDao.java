package com.jobportal.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobportal.entity.UserEducation;

@Repository
public interface UserEducationDao extends JpaRepository<UserEducation, Integer> {

}
