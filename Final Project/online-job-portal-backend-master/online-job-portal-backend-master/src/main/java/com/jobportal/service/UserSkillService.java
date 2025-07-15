package com.jobportal.service;

import com.jobportal.entity.UserSkill;

public interface UserSkillService {
	
	UserSkill add(UserSkill skill);

	UserSkill update(UserSkill skill);

	UserSkill getById(int skillId);

}
