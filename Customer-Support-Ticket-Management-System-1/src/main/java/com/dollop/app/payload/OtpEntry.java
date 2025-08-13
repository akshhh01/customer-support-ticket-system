package com.dollop.app.payload;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class OtpEntry {
	
	private String otp;
	private Instant expiry;

}
