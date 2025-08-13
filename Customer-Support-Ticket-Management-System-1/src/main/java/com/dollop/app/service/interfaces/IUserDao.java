package com.dollop.app.service.interfaces;

import org.springframework.stereotype.Component;

import com.dollop.app.dto.LogIn;
import com.dollop.app.dto.UsersDto;
import com.dollop.app.model.Users;

@Component
public interface IUserDao {
	 UsersDto getMe(String email);
	UsersDto register(UsersDto user);
    Users logIn(LogIn logIn);	
	
}
