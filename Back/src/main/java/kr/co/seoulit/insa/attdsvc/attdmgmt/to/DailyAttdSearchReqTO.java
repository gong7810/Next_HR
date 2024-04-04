package kr.co.seoulit.insa.attdsvc.attdmgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Transient;

@Data
@EqualsAndHashCode(callSuper=false)
public class DailyAttdSearchReqTO extends BaseTO{

	private String deptCode;
	private String startDate;
	private String endDate;
	private String type;
	private String authLevel;


}
