package kr.co.seoulit.insa.attdsvc.attdappvl.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class AnnualLeaveMgtTO extends BaseTO{
	
	private String empCode;
	private String empName;
	private String applyYearMonth;
	private String afternoonOff;
	private String monthlyLeave;
	private String remainingHoliday;
	private String finalizeStatus;
	private String totalUsing;

}
