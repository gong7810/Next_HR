package kr.co.seoulit.insa.commsvc.systemmgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class NoticeTO extends BaseTO{
	
	private String dept;
	private String empName;
	private String noticeDate;
	private String noticeTitle;
	private String noticeWord;

	
}
