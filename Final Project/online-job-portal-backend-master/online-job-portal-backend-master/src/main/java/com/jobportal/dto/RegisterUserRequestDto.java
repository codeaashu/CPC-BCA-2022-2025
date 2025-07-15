package com.jobportal.dto;

import org.springframework.beans.BeanUtils;

import com.jobportal.entity.Address;
import com.jobportal.entity.User;

public class RegisterUserRequestDto {

	// user details
	private String firstName;

	private String lastName;

	private String emailId;

	private String password;

	private String phoneNo;

	private String role;

	// user address
	private String street;

	private String city;

	private String pincode;

	private String state;

	private String country;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
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

	public static User toUserEntity(RegisterUserRequestDto registerUserRequestDto) {
		User user = new User();
		BeanUtils.copyProperties(registerUserRequestDto, user);
		return user;
	}

	public static Address toAddressEntity(RegisterUserRequestDto registerUserRequestDto) {
		Address address = new Address();
		BeanUtils.copyProperties(registerUserRequestDto, address);
		return address;
	}

}
