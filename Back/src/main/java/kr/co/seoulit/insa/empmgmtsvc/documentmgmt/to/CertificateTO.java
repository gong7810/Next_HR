package kr.co.seoulit.insa.empmgmtsvc.documentmgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class CertificateTO extends BaseTO {
	
	private String empCode;
	private String empName;
	private String deptName;
	private String requestDate;
	private String useDate;
	private String usageCode;
	private String usageName;
	private String etc;
	private String approvalStatus;
	private String rejectCause;

}
