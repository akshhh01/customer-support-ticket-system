package com.dollop.app.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dollop.app.dto.LogIn;
import com.dollop.app.dto.UsersDto;
import com.dollop.app.model.Users;
import com.dollop.app.service.impl.UserImpl;
import com.dollop.app.service.interfaces.IEmailService;
import com.dollop.app.utils.GenerateOtp;
import com.dollop.app.utils.JwtTokenUtils;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserImpl userDao;
	@Autowired
	private GenerateOtp generateOtp;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtTokenUtils jwtUtil;
	@Autowired
	private IEmailService emailService;

	@GetMapping("/otp/{email}")
	public ResponseEntity<?> getOtp(@PathVariable String email) throws InterruptedException {
		String otp = generateOtp.generateOtp();
		emailService.sendMail(email, otp);
		return ResponseEntity.ok(otp);
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody UsersDto usersDto) {
		return ResponseEntity.ok(userDao.register(usersDto));
	}

	@PostMapping("/login")
	public ResponseEntity<?> logIn(@Valid @RequestBody LogIn logIn) {
		    Users user = userDao.logIn(logIn);
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(logIn.getEmail(), logIn.getPassword()));
			String token = jwtUtil.generateToken(authentication.getName());
			Map<String, Object> response = new HashMap<>();
			response.put("token", token);
			response.put("user", user);
			return ResponseEntity.ok(response);	
	}

	@GetMapping("/getall")
	public ResponseEntity<?> getAll() {
		System.out.println("getAll");
		return ResponseEntity.ok(userDao.getAll());
	}
	
	@GetMapping("/profile")
	public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
	    String username = userDetails.getUsername();	    
	    return ResponseEntity.ok(userDao.getMe(username));
	}
	
	@PutMapping("/update/{mail}")
	public ResponseEntity<?> updateProfile(@PathVariable String mail,@Valid @RequestBody UsersDto dto) {	
		return ResponseEntity.ok(userDao.update(dto, mail));
	}
	
	@GetMapping("/filter/{date}")
	public ResponseEntity<?> filterWise(@PathVariable LocalDate date){
		System.out.println("date" + date);
		return ResponseEntity.ok(userDao.getUserByFilter(date));
	}
	

}
