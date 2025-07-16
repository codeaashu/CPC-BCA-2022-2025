package com.jobportal.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {

	String storeCompanyLogo(MultipartFile file);

	Resource loadCompanyLogo(String fileName);

	void deleteCompanyLogo(String fileName);
	
	String storeResume(MultipartFile file);

	Resource loadResume(String fileName);

	void deleteResume(String fileName);
	
	String storeProfilePhoto(MultipartFile file);

	Resource loadProfilePhoto(String fileName);

	void deleteProfilePhoto(String fileName);

}