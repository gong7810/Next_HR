package kr.co.seoulit.insa.attd.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;


@Entity
@Data
@EqualsAndHashCode(callSuper=false)
@Table(name="REST_ATTD_MANAGE")
public class BreakAttdTO extends BaseTO {

    @Id
    private String restAttdNo;      // 근태외일렬번호
    @Transient
    private String empName;         // 사원명
    private String deptCode;        // 부서코드
    private String attdType;        // 근태유형
    private String startDate;       // 시작날짜
    private String endDate;         // 종료날짜
    private String cause;           // 사유
    private String approvalStatus;  // 승인상태
    @Transient
    private String remainBreakAttd; // 남은연차
    @Transient
    private String authority;       // 권한레벨

}
