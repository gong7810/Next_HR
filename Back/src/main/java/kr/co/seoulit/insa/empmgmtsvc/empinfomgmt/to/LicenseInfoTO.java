package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class LicenseInfoTO extends BaseTO{
	
	private String empCode;
	private String licenseCode;
	private String licenseName;
	private String getDate;
	private String expireDate;
	private String licenseLevel;
	private String licenseCenter;
	private String issueNumber;

}
