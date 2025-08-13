package com.dollop.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class AppConfig{

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		System.out.println("AppConfig/passwordEncoder/new BCryptPasswordEncoder()->"+new BCryptPasswordEncoder());
		return new BCryptPasswordEncoder();
	}
	
}
