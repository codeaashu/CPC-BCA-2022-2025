package com.jobportal.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.dao.UserProfileDao;
import com.jobportal.entity.UserProfile;

@Service
public class UserProfileServiceImpl implements UserProfileService {

	@Autowired
	private UserProfileDao userProfileDao;

	@Override
	public UserProfile add(UserProfile userProfile) {
		return userProfileDao.save(userProfile);
	}

	@Override
	public UserProfile update(UserProfile userProfile) {
		return userProfileDao.save(userProfile);
	}

	@Override
	public UserProfile getById(int userProfileId) {

		Optional<UserProfile> optionalProfile = this.userProfileDao.findById(userProfileId);

		if (optionalProfile.isPresent()) {
			return optionalProfile.get();
		}

		return null;
	}

}
