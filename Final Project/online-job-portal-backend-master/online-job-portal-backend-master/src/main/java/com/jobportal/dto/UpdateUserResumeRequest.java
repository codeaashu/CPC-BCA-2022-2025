package com.jobportal.dto;

import org.springframework.web.multipart.MultipartFile;

public class UpdateUserResumeRequest {

	private int userId;

	private MultipartFile resume;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public MultipartFile getResume() {
		return resume;
	}

	public void setResume(MultipartFile resume) {
		this.resume = resume;
	}

}
