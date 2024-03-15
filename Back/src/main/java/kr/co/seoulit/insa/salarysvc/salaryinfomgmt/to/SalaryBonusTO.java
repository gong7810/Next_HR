package kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class SalaryBonusTO {
	
	private String empCode , empName , deptCode , position, baseSalary, benefit, grade, hobong;

	public String getEmpCode() {
		return empCode;
	}

	public void setEmpCode(String empCode) {
		this.empCode = empCode;
	}

	public String getEmpName() {
		return empName;
	}

	public void setEmpName(String empName) {
		this.empName = empName;
	}

	public String getDeptCode() {
		return deptCode;
	}

	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getBaseSalary() {
		return baseSalary;
	}

	public void setBaseSalary(String baseSalary) {
		this.baseSalary = baseSalary;
	}

	public String getBenefit() {
		return benefit;
	}

	public void setBenefit(String benefit) {
		this.benefit = benefit;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getHobong() {
		return hobong;
	}

	public void setHobong(String hobong) {
		this.hobong = hobong;
	}
}
