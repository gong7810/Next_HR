package kr.co.seoulit.insa.newempsvc.newempinfomgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class UploadFileTO
{
	private String uploadFileName;
	private String uploadFileUrl;
}
