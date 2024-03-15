package kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to;
import lombok.Data;
import lombok.EqualsAndHashCode;
@Data
@EqualsAndHashCode(callSuper=false)
public class SalaryAwardTO {
    private String empCode;

    public String getEmpCode() {
        return empCode;
    }
    public void setEmpCode(String empCode) {
        this.empCode = empCode;
    }



}