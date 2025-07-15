package com.jobportal.service;

import java.io.File;
import java.io.FileOutputStream;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

@Component
public class StorageServiceImpl implements StorageService {

	@Value("${com.jobportal.image.logo.folder.path}")
	private String COMPANY_LOGO_FOLDER_PATH;

	@Value("${com.jobportal.image.logo.folder.path}")
	private String USER_PROFILE_FOLDER_PATH;

	@Value("${com.jobportal.image.logo.folder.path}")
	private String USER_RESUME_FOLDER_PATH;

	@Override
	public String storeCompanyLogo(MultipartFile file) {

		String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));

		String fileName = UUID.randomUUID().toString().replaceAll("-", "") + ext;
		File filePath = new File(COMPANY_LOGO_FOLDER_PATH, fileName);
		try (FileOutputStream out = new FileOutputStream(filePath)) {
			FileCopyUtils.copy(file.getInputStream(), out);
			return fileName;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Resource loadCompanyLogo(String fileName) {
		File filePath = new File(COMPANY_LOGO_FOLDER_PATH, fileName);
		if (filePath.exists())
			return new FileSystemResource(filePath);
		return null;
	}

	@Override
	public void deleteCompanyLogo(String fileName) {
		File filePath = new File(COMPANY_LOGO_FOLDER_PATH, fileName);
		if (filePath.exists())
			filePath.delete();
	}

	@Override
	public String storeResume(MultipartFile file) {

		String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));

		String fileName = UUID.randomUUID().toString().replaceAll("-", "") + ext;
		File filePath = new File(USER_RESUME_FOLDER_PATH, fileName);
		try (FileOutputStream out = new FileOutputStream(filePath)) {
			FileCopyUtils.copy(file.getInputStream(), out);
			return fileName;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Resource loadResume(String fileName) {
		File filePath = new File(USER_RESUME_FOLDER_PATH, fileName);
		if (filePath.exists())
			return new FileSystemResource(filePath);
		return null;
	}

	@Override
	public void deleteResume(String fileName) {
		File filePath = new File(USER_RESUME_FOLDER_PATH, fileName);
		if (filePath.exists())
			filePath.delete();
	}

	@Override
	public String storeProfilePhoto(MultipartFile file) {

		String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));

		String fileName = UUID.randomUUID().toString().replaceAll("-", "") + ext;
		File filePath = new File(USER_PROFILE_FOLDER_PATH, fileName);
		try (FileOutputStream out = new FileOutputStream(filePath)) {
			FileCopyUtils.copy(file.getInputStream(), out);
			return fileName;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Resource loadProfilePhoto(String fileName) {
		File filePath = new File(USER_PROFILE_FOLDER_PATH, fileName);
		if (filePath.exists())
			return new FileSystemResource(filePath);
		return null;
	}

	@Override
	public void deleteProfilePhoto(String fileName) {
		File filePath = new File(USER_PROFILE_FOLDER_PATH, fileName);
		if (filePath.exists())
			filePath.delete();
	}

}
