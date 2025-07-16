package com.jobportal.dto;

import java.util.ArrayList;
import java.util.List;

import com.jobportal.entity.Job;

public class JobResponse extends CommonApiResponse {

	private List<Job> jobs = new ArrayList<>();

	public List<Job> getJobs() {
		return jobs;
	}

	public void setJobs(List<Job> jobs) {
		this.jobs = jobs;
	}

}
