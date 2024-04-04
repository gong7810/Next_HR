package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class FamilyInfoTO extends BaseTO{
	
	private String empCode;
	private String familyCode;
	private String familyName;
	private String relation;
	private String birthdate;
	private String liveTogether;

}
