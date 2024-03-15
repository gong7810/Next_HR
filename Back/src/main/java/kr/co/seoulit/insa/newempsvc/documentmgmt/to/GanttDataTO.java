package kr.co.seoulit.insa.newempsvc.documentmgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class GanttDataTO
{
	private int duration;
	private String text;
	private String start_date;
	private String end_date;
	private String id;
	private String parent;
	private String open = "true";

}
