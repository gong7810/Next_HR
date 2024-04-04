package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class EmpAppointmentTO extends BaseTO {

	private String empCode;
	private String hosu;
	private String deptChangeStatus;
	private String positionChangeStatus;
	private String hobongChangeStatus;
	private String retirementStatus;
	private String dispatchStatus;
	private String leaveStatus;
	private String requestDate;
	private String approvalStatus;
	private String empName;
	private String title;
	private String appointmentDate;
	private String appointmentDetail;
	private String appointmentCount;
	private String requestStatus;
	private String beforeChange;
	private String afterChange;
	private String type;

}