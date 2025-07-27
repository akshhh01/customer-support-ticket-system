package com.dollop.app.dto;

import lombok.Data;

@Data
public class AuthRequest {
	private String userName;
	private String userPwd;
}
