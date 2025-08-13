package com.dollop.app.utils;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.dollop.app.payload.OtpEntry;

@Component
public class GenerateOtp {

	private static final Map<UUID, OtpEntry> otpStore = new HashMap<>();
	private static final SecureRandom random = new SecureRandom();

	private UUID id;
	public UUID getId() {
		return UUID.randomUUID();
	}

	public String generateOtp() {	
		this.id = getId();
		String otp = String.valueOf(100000 + random.nextInt(900000)); // 6-digit OTP
		Instant expiryTime = Instant.now().plusSeconds(30);
		otpStore.put(id, new OtpEntry(otp, expiryTime));
		return otp;
	}

	public boolean isOtpValid(String inputOtp) {
		OtpEntry entry = otpStore.get(id);
		if (entry == null)
			return false;

		if (Instant.now().isAfter(entry.getExpiry())) {
			otpStore.remove(id); // clean up expired
			return false;
		}
		return entry.getOtp().equals(inputOtp);
	}

}
