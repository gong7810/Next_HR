package kr.co.seoulit.insa.newempsvc.newempinfomgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class ApplicantTO {
	private double personality_avg;
	private double interview_avg;
	private String code;
	private String name;
	private int age;
	private String dept;
	private String gender;
	private String last_school;
	private String tel;
	private String address;
	private String career;
	private String email;

}
