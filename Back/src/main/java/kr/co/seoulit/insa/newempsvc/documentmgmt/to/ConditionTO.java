package kr.co.seoulit.insa.newempsvc.documentmgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class ConditionTO {
	private int min_age;
	private int max_age;
	private String dept;
	private String last_school;
	private String half;
	private int year;
	private String hwp_file;
	private String career;
	

	
	
}
