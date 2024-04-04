package kr.co.seoulit.insa.commsvc.systemmgmt.to;

import java.util.ArrayList;
import java.util.List;

import kr.co.seoulit.insa.sys.util.BoardFile;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class BoardTO {
	private int board_seq;		// 게시글번호
	private int ref_seq;		// 그룹번호
	private int reply_seq;		// 어미글번호
	private int reply_level;	// 답변깊이
	private String reg_date;    // 작성일자
	private String name;		// 작성자
	private String title;		// 제목
	private String content;		// 내용
	private int hit;			// 조회수
	
	private List<BoardFile> boardFiles;

	public void addBoardFile(BoardFile boardFile) {
		boardFiles.add(boardFile);
	}
	
}
