package kr.co.seoulit.insa.newempsvc.documentmgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class FileTO {
	private String uid;
	private String fileName;
	private String contentType;


	
}
