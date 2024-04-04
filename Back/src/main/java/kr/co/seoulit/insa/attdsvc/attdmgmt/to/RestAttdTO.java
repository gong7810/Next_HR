package kr.co.seoulit.insa.attdsvc.attdmgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class RestAttdTO extends BaseTO{
	
	private String empCode;
	private String empName;
	private String restAttdCode;
	private String restTypeCode;
	private String restTypeName;
	private String requestDate;
	private String startDate;
	private String endDate;
	private String numberOfDays;
	private String cost;
	private String cause;
	private String applovalStatus;
	private String rejectCause;
	private String startTime;
	private String endTime;

}
