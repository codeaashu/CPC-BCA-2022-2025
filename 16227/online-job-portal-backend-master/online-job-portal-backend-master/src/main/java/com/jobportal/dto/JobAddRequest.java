package com.jobportal.dto;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import com.jobportal.entity.Address;
import com.jobportal.entity.Job;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class JobAddRequest {

	@NotNull
	private Integer employerId; // user id with role employer

	@NotNull
	private Integer jobCategoryId;

	@NotBlank
	private String title;

	@NotBlank
	private String description;

	@NotBlank
	private String companyName;

	@NotBlank
	private MultipartFile companyLogo;

	@NotBlank
	private String jobType; // full time, part time, contract

	@NotBlank
	private String salaryRange;

	@NotBlank
	private String experienceLevel;

	@NotBlank
	private String requiredSkills;

	// address
	@NotBlank
	private String street;

	@NotBlank
	private String city;

	@NotBlank
	private String pincode;

	@NotBlank
	private String state;

	@NotBlank
	private String country;

	public Integer getEmployerId() {
		return employerId;
	}

	public void setEmployerId(Integer employerId) {
		this.employerId = employerId;
	}

	public Integer getJobCategoryId() {
		return jobCategoryId;
	}

	public void setJobCategoryId(Integer jobCategoryId) {
		this.jobCategoryId = jobCategoryId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public MultipartFile getCompanyLogo() {
		return companyLogo;
	}

	public void setCompanyLogo(MultipartFile companyLogo) {
		this.companyLogo = companyLogo;
	}

	public String getJobType() {
		return jobType;
	}

	public void setJobType(String jobType) {
		this.jobType = jobType;
	}

	public String getSalaryRange() {
		return salaryRange;
	}

	public void setSalaryRange(String salaryRange) {
		this.salaryRange = salaryRange;
	}

	public String getExperienceLevel() {
		return experienceLevel;
	}

	public void setExperienceLevel(String experienceLevel) {
		this.experienceLevel = experienceLevel;
	}

	public String getRequiredSkills() {
		return requiredSkills;
	}

	public void setRequiredSkills(String requiredSkills) {
		this.requiredSkills = requiredSkills;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public static Job toJobEntity(JobAddRequest jobAddRequest) {
		Job job = new Job();
		BeanUtils.copyProperties(jobAddRequest, job, "companyLogo", "employerId", "jobCategoryId");
		return job;
	}

	public static Address toAddressEntity(JobAddRequest jobAddRequest) {
		Address address = new Address();
		BeanUtils.copyProperties(jobAddRequest, address);
		return address;
	}

}
