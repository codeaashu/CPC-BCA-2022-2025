package com.jobportal.service;

import com.jobportal.entity.UserEducation;

public interface UserEducationService {
	
	UserEducation add(UserEducation userEducation);

	UserEducation update(UserEducation userEducation);

	UserEducation getById(int userEducationId);

}
