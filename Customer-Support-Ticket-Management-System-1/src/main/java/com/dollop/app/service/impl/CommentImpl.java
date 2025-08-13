package com.dollop.app.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dollop.app.dto.CommentSDto;
import com.dollop.app.exceptions.ResourceNotFoundException;
import com.dollop.app.mapper.ICommentMapper;
import com.dollop.app.model.Comments;
import com.dollop.app.model.Ticket;
import com.dollop.app.repository.ICommentsRepository;
import com.dollop.app.repository.ITicketRepository;
import com.dollop.app.repository.IUserRepository;
import com.dollop.app.service.interfaces.ICommentDao;

@Service
public class CommentImpl implements ICommentDao{
	@Autowired
	private ICommentsRepository repository;
	@Autowired
	private ICommentMapper mapper;
	@Autowired
	private ITicketRepository ticketRepository;
	@Autowired 
	private IUserRepository userRepository;
	  

	@Override
	public CommentSDto addComment(CommentSDto dto) {
		// TODO Auto-generated method stub
		Comments comment = mapper.toEntity(dto);
		comment.setTicket(ticketRepository.findById(dto.getTicketId()).orElseThrow(()-> new ResourceNotFoundException("this ticket is invalidate")));
		comment.setUser(userRepository.findById(dto.getUserId()).orElseThrow(()-> new ResourceNotFoundException("this user is invalidate")));
		return mapper.toDto(repository.save(comment));
	}

	@Override
	public List<CommentSDto> getCommentsByTicket(Integer id) {
		// TODO Auto-generated method stub
		Ticket ticket = ticketRepository.findById(id).get();
		List<Comments> comments = repository.findByTicket(ticket);
		List<CommentSDto> dtos =new ArrayList<>();
		if(!comments.isEmpty()) {
			for(Comments comment : comments) {
				dtos.add(mapper.toDto(comment));
			}
			return dtos;
		}
		return dtos;
	}
	
	public List<CommentSDto> getCommemntBycreatedAt(LocalDate date){
		List<Comments> comments = repository.findByCreatedAtBefore(date);
		System.out.println(comments);
		return comments.stream().map(comment -> mapper.toDto(comment)).collect(Collectors.toList());
	}

}
