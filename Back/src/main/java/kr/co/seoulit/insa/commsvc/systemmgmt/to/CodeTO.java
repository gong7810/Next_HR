package kr.co.seoulit.insa.commsvc.systemmgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class CodeTO extends BaseTO{
	
	private String codeNumber;
	private String codeName;
	private String modifiable;


}
