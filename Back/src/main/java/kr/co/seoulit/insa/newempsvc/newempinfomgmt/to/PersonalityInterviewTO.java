package kr.co.seoulit.insa.newempsvc.newempinfomgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class PersonalityInterviewTO
{
	private String p_code, p_name;
	private int p_age;
	private int p_challenge;
	private int p_creativity;
	private int p_passion;
	private int p_cooperation;
	private int p_globalmind;
	private int i_attitude;
	private int i_scrupulosity;
	private int i_reliability;
	private int i_creativity;
	private int i_positiveness;

}
