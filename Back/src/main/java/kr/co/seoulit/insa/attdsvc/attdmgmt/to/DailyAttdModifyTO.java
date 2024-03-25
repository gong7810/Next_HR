package kr.co.seoulit.insa.attdsvc.attdmgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class DailyAttdModifyTO extends BaseTO{

	private String empName;
	private String deptCode;
	private String attendTime;
	private String leaveTime;
	private String briefLeaveTime;
	private String workHour;
	private String latenessStatus;
	private String overWorkHour;
	private String nightWorkHour;
	private String earlyLeaveTime;

}
