package kr.co.seoulit.insa.commsvc.foudinfomgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class DeptTO extends BaseTO {
	
	private String deptCode;
	private String deptName;
	private String deptTel;


}
