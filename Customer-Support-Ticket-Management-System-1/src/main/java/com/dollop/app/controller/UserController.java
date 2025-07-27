package com.dollop.app.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dollop.app.dto.LogIn;
import com.dollop.app.dto.UsersDto;
import com.dollop.app.model.Users;
import com.dollop.app.service.impl.UserImpl;
import com.dollop.app.utils.JwtTokenUtils;

import jakarta.validation.Valid;

//@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserImpl userDao;
	 private final AuthenticationManager authenticationManager;
	    private final JwtTokenUtils jwtUtil;
	

	    public UserController(AuthenticationManager authenticationManager, JwtTokenUtils jwtUtil
	    		) {
	        this.authenticationManager = authenticationManager;
	        this.jwtUtil = jwtUtil;
	      
	    }

	
	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody UsersDto usersDto){
		System.out.println("controller"+usersDto);
			return ResponseEntity.ok(userDao.register(usersDto));
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> logIn(@Valid @RequestBody LogIn logIn ){
	    Users user = userDao.logIn(logIn); // Already checks email + password
	    if(user != null) {
	        Authentication authentication = authenticationManager.authenticate(
	            new UsernamePasswordAuthenticationToken(logIn.getEmail(), logIn.getPassword()));
	        
	        String token = jwtUtil.generateToken(authentication.getName());

	        // Return proper response object
	        Map<String, Object> response = new HashMap<>();
	        response.put("token", token);
	        response.put("roles", user.getRole()); // assuming user.getRole() returns List<String>
	        response.put("user", user); // full user object

	        return ResponseEntity.ok(response);
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	    }
	}

	
	@GetMapping("/getall")
	public ResponseEntity<?> getAll(){
		System.out.println("it is get-all method");
			return ResponseEntity.ok(userDao.getAll());	    	 
	}
	
}
