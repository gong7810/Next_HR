package kr.co.seoulit.insa.commsvc.foudinfomgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class BaseWorkTimeTO extends BaseTO {

	private String applyYear;
	private String attendTime;
	private String quitTime;
	private String lunchStartTime;
	private String lunchEndTime;
	private String dinnerStartTime;
	private String dinnerEndTime;
	private String overEndTime;
	private String nightEndTime;

}
