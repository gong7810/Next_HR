package kr.co.seoulit.insa.attdsvc.attdmgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class DayAttdTO extends BaseTO{
	
	private String empCode;
	private String empName;
	private String dayAttdCode;
	private String applyDay;
	private String attdTypeCode;
	private String attdTypeName;
	private String time;

}
