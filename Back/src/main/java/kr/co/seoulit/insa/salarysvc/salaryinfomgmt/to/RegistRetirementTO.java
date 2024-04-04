package kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;
    @Data
    @EqualsAndHashCode(callSuper=false)
    public class RegistRetirementTO {

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
