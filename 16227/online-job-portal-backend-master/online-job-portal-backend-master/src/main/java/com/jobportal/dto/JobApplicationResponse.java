package com.jobportal.dto;

import java.util.ArrayList;
import java.util.List;

import com.jobportal.entity.JobApplication;

public class JobApplicationResponse extends CommonApiResponse {

	private List<JobApplication> applications = new ArrayList<>();

	public List<JobApplication> getApplications() {
		return applications;
	}

	public void setApplications(List<JobApplication> applications) {
		this.applications = applications;
	}

}
