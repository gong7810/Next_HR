package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class EmpAppointmentRegTO
{
	private String empCode;
	private String hosu;
	private String afterChange;
	private String startDate;
	private String endDate;
	private String type;

}
