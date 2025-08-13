package com.dollop.app.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import com.dollop.app.dto.TicketDto;
import com.dollop.app.model.Ticket;
import com.dollop.app.model.TicketPriority;
import com.dollop.app.model.Users;

@Mapper(componentModel = "spring")  // This makes the mapper a Spring bean automatically
public interface TicketMapper {

    TicketMapper INSTANCE = Mappers.getMapper(TicketMapper.class);

    // Mapping TicketDto to Ticket
    @Mappings({
        @Mapping(source = "priority", target = "priority", qualifiedByName = "mapStringToTicketPriority"),  // String to Enum mapping
        @Mapping(source = "createdBy", target = "createdBy", qualifiedByName = "mapUserIdToUsers"),  // User ID to Users entity mapping
        @Mapping(source = "assignedTo", target = "assignedTo", qualifiedByName = "mapUserIdToUsers"),  // Assigned User ID to Users entity mapping
    })
    Ticket toEntity(TicketDto ticketDto);

    // Mapping Ticket to TicketDto
    @Mappings({
        @Mapping(source = "priority", target = "priority", qualifiedByName = "mapTicketPriorityToString"),  // Enum to String mapping
        @Mapping(source = "createdBy", target = "createdBy", qualifiedByName = "mapUsersToUserId"),  // Users entity to User ID mapping
        @Mapping(source = "assignedTo", target = "assignedTo", qualifiedByName = "mapUsersToUserId"),  // Assigned Users entity to User ID mapping
    })
    TicketDto toDto(Ticket ticket);

    // Custom mapping methods for complex conversions:

    // String -> TicketPriority mapping
    @org.mapstruct.Named("mapStringToTicketPriority")
    default TicketPriority mapStringToTicketPriority(TicketPriority priority) {
        if (priority == null) {
            return null;
        }
        return priority;  // Convert String to TicketPriority enum
    }

    // TicketPriority -> String mapping
    @org.mapstruct.Named("mapTicketPriorityToString")
    default TicketPriority mapTicketPriorityToString(TicketPriority priority) {
        if (priority == null) {
            return null;
        }
        return priority;  // Convert TicketPriority enum to String
    }

    // Integer -> Users mapping (User ID to Users entity)
    @org.mapstruct.Named("mapUserIdToUsers")
    default Users mapUserIdToUsers(Integer userId) {
        if (userId == null) {
            return null;
        }
        Users user = new Users();
        user.setId(userId);  // Assume that Users entity has a setId method.
        return user;
    }
    @org.mapstruct.Named("mapUsersToUserId")
    default Integer mapUsersToUserId(Users user) {
    	if(user==null) {
    		return null;
    	}
    	return user.getId();
    }
}
