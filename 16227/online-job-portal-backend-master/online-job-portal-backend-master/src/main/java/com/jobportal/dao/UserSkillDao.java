package com.jobportal.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobportal.entity.UserSkill;

@Repository
public interface UserSkillDao extends JpaRepository<UserSkill, Integer> {

}
