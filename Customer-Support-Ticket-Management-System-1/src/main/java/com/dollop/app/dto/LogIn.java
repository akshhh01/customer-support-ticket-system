package com.dollop.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogIn {
	
	  @NotBlank(message = "Email is required")
	    @Pattern(
	        regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$",
	        message = "Invalid email format"
	    )
	    private String email;

	    @NotBlank(message = "Password is required")
	    @Size(min = 6, message = "Password must be at least 6 characters long")
	    private String password;

}
