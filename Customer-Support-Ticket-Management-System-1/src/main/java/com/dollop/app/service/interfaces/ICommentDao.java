package com.dollop.app.service.interfaces;

import java.util.List;

import com.dollop.app.dto.CommentSDto;

public interface ICommentDao {
	
	CommentSDto addComment(CommentSDto comments);

	List<CommentSDto> getCommentsByTicket(Integer id);

}
