package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class EmpAppointmentTO extends BaseTO {

	private String empCode, hosu, deptChangeStatus, positionChangeStatus, hobongChangeStatus,
			retirementStatus, dispatchStatus, leaveStatus, requestDate, approvalStatus,
			empName, title, appointmentDate, appointmentDetail, appointmentCount, requestStatus,
			beforeChange, afterChange, type;
}