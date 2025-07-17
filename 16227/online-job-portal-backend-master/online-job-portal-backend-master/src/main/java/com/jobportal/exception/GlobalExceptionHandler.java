package com.jobportal.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.jobportal.dto.CommonApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<CommonApiResponse> handleUserNotFoundException(UserNotFoundException ex) {
		String responseMessage = ex.getMessage();

		CommonApiResponse apiResponse = new CommonApiResponse();

		apiResponse.setResponseMessage(responseMessage);
		apiResponse.setSuccess(false);
		return new ResponseEntity<CommonApiResponse>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(UserSaveFailedException.class)
	public ResponseEntity<CommonApiResponse> handleUserRegistrationFailedException(UserSaveFailedException ex) {
		String responseMessage = ex.getMessage();
		CommonApiResponse apiResponse = new CommonApiResponse();

		apiResponse.setResponseMessage(responseMessage);
		apiResponse.setSuccess(false);
		return new ResponseEntity<CommonApiResponse>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<CommonApiResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
		String responseMessage = ex.getMessage();

		CommonApiResponse apiResponse = new CommonApiResponse();

		apiResponse.setResponseMessage(responseMessage);
		apiResponse.setSuccess(false);
		return new ResponseEntity<CommonApiResponse>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(CategorySaveFailedException.class)
	public ResponseEntity<CommonApiResponse> handleCategorySaveFailedException(CategorySaveFailedException ex) {
		String responseMessage = ex.getMessage();

		CommonApiResponse apiResponse = new CommonApiResponse();

		apiResponse.setResponseMessage(responseMessage);
		apiResponse.setSuccess(false);
		return new ResponseEntity<CommonApiResponse>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(JobSaveFailedException.class)
	public ResponseEntity<CommonApiResponse> handleProductSaveFailedException(JobSaveFailedException ex) {
		String responseMessage = ex.getMessage();
		CommonApiResponse apiResponse = new CommonApiResponse();

		apiResponse.setResponseMessage(responseMessage);
		apiResponse.setSuccess(false);
		return new ResponseEntity<CommonApiResponse>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
