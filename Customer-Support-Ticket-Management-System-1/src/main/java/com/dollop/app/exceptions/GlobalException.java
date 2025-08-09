package com.dollop.app.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<Map<String, Object>> checkResource(ResourceNotFoundException ex) {
	    Map<String, Object> err = new HashMap<>();
	    err.put("message", ex.getMessage());
	    return new ResponseEntity<>(err, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {
	    Map<String, Object> error = new HashMap<>();
	    error.put("message", ex.getMessage());
	    return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, Object>> argsException(ResourceNotFoundException ex) {
	    Map<String, Object> err = new HashMap<>();
	    err.put("message", ex.getMessage());
	    System.out.println(err);
	    return new ResponseEntity<>(err, HttpStatus.NOT_FOUND);
	}
}
