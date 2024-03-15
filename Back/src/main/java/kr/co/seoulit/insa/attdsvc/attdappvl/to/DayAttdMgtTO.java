package kr.co.seoulit.insa.attdsvc.attdappvl.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class DayAttdMgtTO extends BaseTO{
	
	private String empCode;
	private String empName;
	private String applyDays;
	private String dayAttdCode;
	private String dayAttdName;
	private String attendTime;
	private String HalfHolidayStatus;
	private String quitTime;
	private String lateWhether;
	private String leaveHour;
	private String workHour;
	private String earlyLeaveHour;
	private String overWorkHour;
	private String nightWorkHour;
	private String finalizeStatus;
	private String privateleaveHour;
	private String publicleaveHour;

}
