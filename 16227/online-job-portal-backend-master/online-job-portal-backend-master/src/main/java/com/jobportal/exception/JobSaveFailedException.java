package com.jobportal.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class JobSaveFailedException extends RuntimeException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public JobSaveFailedException(String message) {
		super(message);
	}

}
