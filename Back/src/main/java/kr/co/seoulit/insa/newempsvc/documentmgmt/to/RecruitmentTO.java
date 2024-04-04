package kr.co.seoulit.insa.newempsvc.documentmgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class RecruitmentTO 
{
	private String pcode;
	private String pname;
	private String gender;
	private String tel;
	private String address;
	private String email;
	private String lastschool;
	private String dept;
	private String approvalStatus;
	private String status;
	private int age;
	private double p_avg, i_avg;
	

	
}
