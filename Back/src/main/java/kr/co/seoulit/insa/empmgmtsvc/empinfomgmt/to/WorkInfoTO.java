package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class WorkInfoTO extends BaseTO{
	
	private String empCode;
	private String workInfoDays;
	private String hiredate;
	private String retireDate;
	private String occupation;
	private String employmentType;
	private String hobong;
	private String position;
	private String deptName;

}
