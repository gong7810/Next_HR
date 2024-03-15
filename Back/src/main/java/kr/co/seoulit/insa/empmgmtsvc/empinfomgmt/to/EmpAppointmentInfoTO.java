package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class EmpAppointmentInfoTO {

	private String title;
	private String hosu;
	private String approval_status;
	private String appointment_detail;
	private String appointment_date;
	private String appointment_count;

}
