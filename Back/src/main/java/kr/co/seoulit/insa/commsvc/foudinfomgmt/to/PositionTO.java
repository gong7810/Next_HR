package kr.co.seoulit.insa.commsvc.foudinfomgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class PositionTO extends BaseTO {
	
	private String positionCode;
	private String position;
	private String basesalary;
	private String hobongratio;


}
