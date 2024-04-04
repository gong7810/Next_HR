package kr.co.seoulit.insa.commsvc.systemmgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class AdminCodeTO extends BaseTO{
	
	String admin_code;
	String admin_authority;
	String authority;



}
