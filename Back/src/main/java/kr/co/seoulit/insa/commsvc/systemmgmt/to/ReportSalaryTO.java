package kr.co.seoulit.insa.commsvc.systemmgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class ReportSalaryTO {
	
	private String empName;
	private String position;
	private String deptName;
	private String hiredate;
	private String applyYearMonth;
	private String totalExtSal;
	private String totalDeduction;
	private String totalPayment;
	private String realSalary;
	private String salary;
	private String cost;
	private String healthIns;
	private String goyongIns;
	private String janggiIns;
	private String gukmin;

	
}
