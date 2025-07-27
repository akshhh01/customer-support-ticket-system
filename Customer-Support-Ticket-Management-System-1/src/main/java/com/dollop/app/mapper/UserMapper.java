package com.dollop.app.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserMapper {
	
	@Bean
	public ModelMapper mapper() {
		return new ModelMapper();
	}

}
