package kr.co.seoulit.insa.newempsvc.documentmgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class GanttLinksTO
{
	private String target;
	private String id;
	private String source;
	private int type;


}
