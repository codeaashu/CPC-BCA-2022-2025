package com.jobportal.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobportal.entity.UserProfile;

@Repository
public interface UserProfileDao extends JpaRepository<UserProfile, Integer> {

}
