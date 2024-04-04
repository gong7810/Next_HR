package kr.co.seoulit.insa.newempsvc.newempinfomgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class NewResumeTO
{
	private String p_code;
	private String p_name;
	private String p_gender;
	private String p_address;
	private String p_tel;
	private String p_dept;
	private String p_last_school;
	private String p_career;
	private String half;
	private String p_email;
	private int p_age, year;
	

}
