package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class EmpAppointmentTypeTO {

	private String empCode;
	private String hosu;
	private String lastDept;
	private String nextDept;
	private String appointmentDate;
	private String dispatchDate;
	private String dispatchReturnDate;
	private String dispatchPosition;
	private String dispatchDept;
	private String lastWorkplace;
	private String lastRegion;
	private String lastHobong;
	private String nextHobong;
	private String promotionDate;
	private String lastPosition;
	private String nextPosition;
	private String retirementDate;
	private String leaveDate;
	private String reinstatementDate;
	private String leaveType;
	private String empName;

}
