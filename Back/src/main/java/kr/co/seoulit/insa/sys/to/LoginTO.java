package kr.co.seoulit.insa.sys.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
@Table(name="MEMBER")
public class LoginTO extends BaseTO {

    @Id
    private String empCode;
    private String id;
    private String pw;

    @Transient
    private String empName;
    @Transient
    private String position;

    public LoginTO (String empCode, String id, String pw) {
        this.empCode = empCode;
        this.id = id;
        this.pw = pw;
    }

}
