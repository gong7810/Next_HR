package kr.co.seoulit.insa.commsvc.systemmgmt.to;

import lombok.*;
import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
@Table(name="AUTHORITY")
public class AuthTO extends BaseTO{

    @Id
    private String positionCode;
    private String position;
    private String authLevel;
}
