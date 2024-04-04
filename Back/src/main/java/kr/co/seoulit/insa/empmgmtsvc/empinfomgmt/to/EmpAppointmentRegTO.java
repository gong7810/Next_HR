package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class EmpAppointmentRegTO extends BaseTO {

	private String empCode;
	private String hosu;
	private String afterChange;
	private String startDate;
	private String endDate;
	private String type;
}
