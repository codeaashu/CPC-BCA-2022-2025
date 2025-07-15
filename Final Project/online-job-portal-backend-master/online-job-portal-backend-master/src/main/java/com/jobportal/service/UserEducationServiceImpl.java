package com.jobportal.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.dao.UserEducationDao;
import com.jobportal.entity.UserEducation;

@Service
public class UserEducationServiceImpl implements UserEducationService {

	@Autowired
	private UserEducationDao userEducationDao;

	@Override
	public UserEducation add(UserEducation userEducation) {
		return userEducationDao.save(userEducation);
	}

	@Override
	public UserEducation update(UserEducation userEducation) {
		return userEducationDao.save(userEducation);
	}

	@Override
	public UserEducation getById(int userEducationid) {

		Optional<UserEducation> optional = this.userEducationDao.findById(userEducationid);

		if (optional.isPresent()) {
			return optional.get();
		}

		return null;
	}

}
