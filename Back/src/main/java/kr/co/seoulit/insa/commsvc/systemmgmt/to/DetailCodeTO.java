package kr.co.seoulit.insa.commsvc.systemmgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class DetailCodeTO {
	
	private String detailCodeNumber;
	private String codeNumber;
	private String detailCodeName;
	private String detailCodeNameusing;


}
