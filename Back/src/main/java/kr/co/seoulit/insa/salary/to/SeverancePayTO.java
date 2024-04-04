package kr.co.seoulit.insa.salary.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;
@Data
@EqualsAndHashCode(callSuper=false)
public class SeverancePayTO extends BaseTO {

    private String empCode;
    private String empName;
    private String hireDate;
    private String retireDate;
    private String applyDate;
    private String severanceType;
    private String workDays;
    private String severancePay;
    private String severanceDeduction;
    private String realSeverancePay;
    private String firstDay;
    private String today;
}
