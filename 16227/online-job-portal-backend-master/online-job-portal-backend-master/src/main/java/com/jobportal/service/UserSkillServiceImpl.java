package com.jobportal.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.dao.UserSkillDao;
import com.jobportal.entity.UserSkill;

@Service
public class UserSkillServiceImpl implements UserSkillService {

	@Autowired
	private UserSkillDao userSkillDao;

	@Override
	public UserSkill add(UserSkill userSkill) {
		return userSkillDao.save(userSkill);
	}

	@Override
	public UserSkill update(UserSkill userSkill) {
		return userSkillDao.save(userSkill);
	}

	@Override
	public UserSkill getById(int userSkillId) {

		Optional<UserSkill> optionalSkill = this.userSkillDao.findById(userSkillId);

		if (optionalSkill.isPresent()) {
			return optionalSkill.get();
		}

		return null;
	}

}
