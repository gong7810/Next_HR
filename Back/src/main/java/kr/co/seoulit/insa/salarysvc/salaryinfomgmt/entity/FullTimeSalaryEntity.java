package kr.co.seoulit.insa.salarysvc.salaryinfomgmt.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name="TOTAL_SALARY")
public class FullTimeSalaryEntity {
    @Id
    private String empCode;
    private String basicSalary;
    private String positionSalary;
    private String benefit;
    private String familySalary;
    private String totalExtSal;
    private String totalDeduction;
    private String realSalary;
    private String mealSalary;

}
