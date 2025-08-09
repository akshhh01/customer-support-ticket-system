package com.dollop.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.dollop.app.exceptions.ResourceNotFoundException;
import com.dollop.app.service.interfaces.IEmailService;

@Service
public class EmailService implements IEmailService {

	@Autowired
	private JavaMailSender javaMailSender;

	@Override
	public String sendMail(String to, String body) {
		try {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject("send otp only testing purpose !");
		message.setText(body);
		javaMailSender.send(message);
        return body;
		}
		catch (Exception e) {
			// TODO: handle exception
			throw new ResourceNotFoundException("Internet not connected !");
		}
	}

}
