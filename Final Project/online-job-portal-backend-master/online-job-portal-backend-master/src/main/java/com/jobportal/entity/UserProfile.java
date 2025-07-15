package com.jobportal.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class UserProfile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String bio;

	private String website; // optional

	private String resume; // resume path

	private String linkedlnProfileLink;

	private String githubProfileLink; // optional

	// Establish a one-to-many relationship between UserProfile and UserSkills
	@OneToMany(mappedBy = "userProfile")
	private List<UserSkill> skills;

	@OneToMany(mappedBy = "userProfile")
	private List<UserEducation> educations;

	@OneToMany(mappedBy = "userProfile")
	private List<UserWorkExperience> workExperiences;

	private String profilePic;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getResume() {
		return resume;
	}

	public void setResume(String resume) {
		this.resume = resume;
	}

	public String getLinkedlnProfileLink() {
		return linkedlnProfileLink;
	}

	public void setLinkedlnProfileLink(String linkedlnProfileLink) {
		this.linkedlnProfileLink = linkedlnProfileLink;
	}

	public String getGithubProfileLink() {
		return githubProfileLink;
	}

	public void setGithubProfileLink(String githubProfileLink) {
		this.githubProfileLink = githubProfileLink;
	}

	public List<UserSkill> getSkills() {
		return skills;
	}

	public void setSkills(List<UserSkill> skills) {
		this.skills = skills;
	}

	public List<UserEducation> getEducations() {
		return educations;
	}

	public void setEducations(List<UserEducation> educations) {
		this.educations = educations;
	}

	public List<UserWorkExperience> getWorkExperiences() {
		return workExperiences;
	}

	public void setWorkExperiences(List<UserWorkExperience> workExperiences) {
		this.workExperiences = workExperiences;
	}

	public String getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

}
