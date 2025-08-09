package com.dollop.app.payload;

import lombok.Data;

@Data
public class AuthRequest {
	private String userName;
	private String userPwd;
}
