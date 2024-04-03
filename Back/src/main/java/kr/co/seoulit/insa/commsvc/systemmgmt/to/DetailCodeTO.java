package kr.co.seoulit.insa.commsvc.systemmgmt.to;

import lombok.*;
import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
@Table(name="DETAIL_CODE")
public class DetailCodeTO {

	@Id
	private String detailCodeNumber;
	private String codeNumber;
	private String detailCodeName;
	private String detailCodeNameusing;

}
