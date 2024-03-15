package kr.co.seoulit.insa.attdsvc.attdappvl.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class MonthAttdMgtTO extends BaseTO{
	
	private String empCode;
	private String empName;
	private String applyYearMonth;
	private String basicWorkDays;
	private String weekdayWorkDays;
	private String basicWorkHour;
	private String workHour;
	private String overWorkHour;
	private String nightWorkHour;
	private String holidayWorkDays;
	private String earlyLeaveDays;
	private String holidayWorkHour;
	private String lateDays;
	private String absentDays;
	private String halfHolidays;
	private String Holidays;
	private String finalizeStatus;


}
