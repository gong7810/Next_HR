package kr.co.seoulit.insa.sys.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
@Table(name="AUTHORITY")
public class LoginTO extends BaseTO {

    @Id
    private String empCode;
    private String id;
    private String pw;

}
