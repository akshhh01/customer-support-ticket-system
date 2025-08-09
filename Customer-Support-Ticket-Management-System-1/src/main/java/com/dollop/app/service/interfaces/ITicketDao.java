package com.dollop.app.service.interfaces;

import java.util.List;

import com.dollop.app.dto.TicketDto;

public interface ITicketDao {
	
  TicketDto	createTicket(TicketDto dto);
List<TicketDto> getTicket(Integer id);

}
