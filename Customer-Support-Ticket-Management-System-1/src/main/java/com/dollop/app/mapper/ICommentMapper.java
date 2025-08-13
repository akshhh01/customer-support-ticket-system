package com.dollop.app.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import com.dollop.app.dto.CommentSDto;
import com.dollop.app.model.Comments;
import com.dollop.app.model.Ticket;
import com.dollop.app.model.Users;

@Mapper(componentModel = "spring")
public interface ICommentMapper {
	
	ICommentMapper INSTANCE = Mappers.getMapper(ICommentMapper.class);
	
	@Mapping(source = "ticketId", target = "ticket", qualifiedByName = "idToTicket")
	@Mapping(source = "userId", target = "user", qualifiedByName = "idToUser")
	Comments toEntity(CommentSDto dto);
	@Mapping(source = "ticket", target = "ticketId", qualifiedByName = "ticketToId")
	@Mapping(source = "user", target = "userId", qualifiedByName = "userToId")
	CommentSDto toDto(Comments comments);
	
	@Named("idToTicket")
	default Ticket idToTicket(Integer id) {
		Ticket ticket = new Ticket();
		ticket.setId(id);
		return ticket;
	}
	
	@Named("ticketToId")
	default Integer ticketToId(Ticket ticket) {
		if(ticket.getId()!=null) {
			return ticket.getId();
		}
		return null;
	}
	
	@Named("idToUser")
	default Users idToUser(Integer id) {
		Users users = new Users();
		 users.setId(id);
		 return users;
	}
	
	@Named("userToId")
	default Integer userToId(Users users) {
		if(users.getId() != null) {
			return users.getId();
		}
		return null;
	}
}
