package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class EmpEvalTO {

	private String empCode;
	private String empName;
	private String lastSchool;
	private String numberOfCertificate;
	private String applyDay;
	private String durationOfTraining;
	private String deptName;
	private String position;
	private String achievement;
	private String ability;
	private String approvalStatus;
	private String grade;
	private String attitude;

}
