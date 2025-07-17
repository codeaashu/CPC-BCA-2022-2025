package com.jobportal.utility;

public class Constants {

	public enum UserRole {
		ROLE_EMPLOYEE("Employee"), ROLE_ADMIN("Admin"), ROLE_EMPLOYER("Employer");

		private String role;

		private UserRole(String role) {
			this.role = role;
		}

		public String value() {
			return this.role;
		}
	}

	public enum ActiveStatus {
		ACTIVE("Active"), DEACTIVATED("Deactivated");

		private String status;

		private ActiveStatus(String status) {
			this.status = status;
		}

		public String value() {
			return this.status;
		}
	}

	public enum JobType {
		FULL_TIME("Full-time"), PART_TIME("Part-time"), CONTRACT("Contract");

		private String type;

		private JobType(String type) {
			this.type = type;
		}

		public String value() {
			return this.type;
		}

	}

	public enum JobStatus {
		ACTIVE("Active"), CLOSED("Closed");

		private String status;

		private JobStatus(String status) {
			this.status = status;
		}

		public String value() {
			return this.status;
		}

	}

	public enum JobApplicationStatus {
		SHORTLISTED("Shortlisted"), REJECTED("Rejected"), APPLIED("Applied"), CANCELLED("Cancelled");

		private String status;

		private JobApplicationStatus(String status) {
			this.status = status;
		}

		public String value() {
			return this.status;
		}

	}

	public enum JobExperienceLevel {
		FRESHER("Fresher"), ONE_TO_THREE_YEAR("1 - 3 Years"), THREE_TO_FIVE_YEAR("3 - 5 Years"),
		FIVE_TO_EIGHT_YEAR("5 - 8 Years"), EIGHT_TO_TEN_YEAR("8 - 10 Years"), MORE_THEN_TEN_YEAR("10+ Years");

		private String level;

		private JobExperienceLevel(String level) {
			this.level = level;
		}

		public String value() {
			return this.level;
		}

	}
	
	public enum SalaryRange {
		ONE_TO_THREE_LAKH("1 - 3 lpa"),
		THREE_TO_SIX_LAKH("3 - 6 lpa"),
		SIX_TO_TWELVE_LAKH("6 - 12 lpa"),
		TWELVE_TO_EIGHTEEN_LAKH("12 - 18 lpa"),
		EIGHTEEN_TO_TWENTY_FIVE_LAKH("18 - 25 lpa"),
		MORE_THEN_TWENTY_FIVE_LAKH("25+ lpa");

		private String range;

		private SalaryRange(String range) {
			this.range = range;
		}

		public String value() {
			return this.range;
		}

	}
	
	public enum UserProfileUpdateType {
		UPDATE_DETAIL("UpdateDetail"),
		UPDATE_SKILLS("UpdateSkill"),
		UPDATE_WORK_EXPERIENCE("UpdateWorkExperience"),
		UPDATE_EDUCATION_DETAIL("UpdateEducation");

		private String type;

		private UserProfileUpdateType(String type) {
			this.type = type;
		}

		public String value() {
			return this.type;
		}
	}

}
