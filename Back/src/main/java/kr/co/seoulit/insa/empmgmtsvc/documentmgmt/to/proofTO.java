package kr.co.seoulit.insa.empmgmtsvc.documentmgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class proofTO extends BaseTO {
	
	private String empName;
	private String empCode;
	private String proofTypeCode;
	private String proofTypeName;
	private String startDate;
	private String position;
	private String dept;
	private String cash;
	private String cause;
	private String receipt;
	private String applovalStatus;

}
