package kr.co.seoulit.insa.empmgmtsvc.pfmevl.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class PfmEvlTO {
	
	private String empCode, empName, deptCode, grade, score, disqualification, durationOfTraining, numberOfCertificate;

}
