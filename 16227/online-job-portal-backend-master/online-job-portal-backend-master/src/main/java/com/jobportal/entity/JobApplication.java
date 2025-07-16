package com.jobportal.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;

@Entity
public class JobApplication {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String applicationId;

	@ManyToOne
	@JoinColumn(name = "job_id")
	private Job job;

	@ManyToOne
	@JoinColumn(name = "employee_id")
	private User employee;

	private String dateTime;

	private String status; // Applied, Shortlisted, Rejected

	@Transient
	private int jobId;

	@Transient
	private int employeeId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(String applicationId) {
		this.applicationId = applicationId;
	}

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}

	public User getEmployee() {
		return employee;
	}

	public void setEmployee(User employee) {
		this.employee = employee;
	}

	public String getDateTime() {
		return dateTime;
	}

	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getJobId() {
		return jobId;
	}

	public void setJobId(int jobId) {
		this.jobId = jobId;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

}
