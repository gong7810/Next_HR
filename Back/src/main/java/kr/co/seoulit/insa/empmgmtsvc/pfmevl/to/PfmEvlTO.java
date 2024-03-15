package kr.co.seoulit.insa.empmgmtsvc.pfmevl.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class PfmEvlTO {
	
	private String empCode;
	private String empName;
	private String deptCode;
	private String grade;
	private String score;
	private String disqualification;
	private String durationOfTraining;
	private String numberOfCertificate;

}
