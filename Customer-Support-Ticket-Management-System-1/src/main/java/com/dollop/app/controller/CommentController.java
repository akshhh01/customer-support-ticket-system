package com.dollop.app.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dollop.app.dto.CommentSDto;
import com.dollop.app.service.impl.CommentImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/comment")
public class CommentController {
	@Autowired
	private CommentImpl impl;

	@PostMapping("/create")
	public ResponseEntity<?> addcomment(@Valid @RequestBody CommentSDto dto) {
		return ResponseEntity.ok(impl.addComment(dto));
	}

	@GetMapping("/get/{id}")
	public ResponseEntity<?> getByTicket(@PathVariable Integer id) {
		return ResponseEntity.ok(impl.getCommentsByTicket(id));
	}
	
	@GetMapping("/filter/{date}")
	public ResponseEntity<?> filterWise(@PathVariable LocalDate date){
		return ResponseEntity.ok(impl.getCommemntBycreatedAt(date));
	

}
}
