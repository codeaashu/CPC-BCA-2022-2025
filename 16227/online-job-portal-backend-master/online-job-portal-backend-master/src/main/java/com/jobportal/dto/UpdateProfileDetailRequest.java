package com.jobportal.dto;

public class UpdateProfileDetailRequest {

	private int userId;

	private String bio;

	private String website;

	private String linkedlnProfileLink;

	private String githubProfileLink;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
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

}
