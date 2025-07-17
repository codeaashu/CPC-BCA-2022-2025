package com.jobportal.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.dao.UserWorkExperienceDao;
import com.jobportal.entity.UserWorkExperience;

@Service
public class UserWorkExperienceServiceImpl implements UserWorkExperienceService {

	@Autowired
	private UserWorkExperienceDao userWorkExperienceDao;

	@Override
	public UserWorkExperience add(UserWorkExperience userWorkExperience) {
		return userWorkExperienceDao.save(userWorkExperience);
	}

	@Override
	public UserWorkExperience update(UserWorkExperience userWorkExperience) {
		return userWorkExperienceDao.save(userWorkExperience);
	}

	@Override
	public UserWorkExperience getById(int userWorkExperienceId) {

		Optional<UserWorkExperience> optionalWorkExperience = this.userWorkExperienceDao.findById(userWorkExperienceId);

		if (optionalWorkExperience.isPresent()) {
			return optionalWorkExperience.get();
		}

		return null;
	}

}
