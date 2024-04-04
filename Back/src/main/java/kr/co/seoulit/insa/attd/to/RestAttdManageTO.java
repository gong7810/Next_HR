package kr.co.seoulit.insa.attd.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Transient;

@Data
@EqualsAndHashCode(callSuper=false)
public class RestAttdManageTO extends BaseTO {

    private String restAttdNo;      // 근태외일렬번호
    private String empCode;         // 사원코드
    private String deptCode;        // 부서코드
    private String attdCode;        // 근태코드
    private String attdType;        // 근태유형
    private String requestDate;     // 신청날짜
    private String startDate;       // 시작날짜
    private String endDate;         // 종료날짜
    private String startTime;       // 시작시간
    private String endTime;         // 종료시간
    private String cause;           // 사유
    private String approvalStatus;  // 승인상태

    @Transient
    private String authority;       // 권한레벨
}
