package com.ecomproject.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalException {

    @ExceptionHandler(SellerException.class)
    public ResponseEntity<ErrorDetails> sellerExceptionHandler(SellerException se, WebRequest request) {
            ErrorDetails errorDetails = new ErrorDetails();
            errorDetails.setDetails(se.getMessage());
            errorDetails.setError(request.getDescription(false));
            errorDetails.setTimestamp(LocalDateTime.now());
            return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ProductException.class)
    public ResponseEntity<ErrorDetails> productExceptionHandler(SellerException se, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setDetails(se.getMessage());
        errorDetails.setError(request.getDescription(false));
        errorDetails.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
}
