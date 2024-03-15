package kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to;


import lombok.*;

@Data
@EqualsAndHashCode(callSuper=false)
public class FullTimeSalTO {
	
	private String empCode, basicSalary, positionSalary, familySalary, mealSalary, benefit, totalExtSal, totalDeduction, realSalary;

	public String getEmpCode() {
		return empCode;
	}

	public void setEmpCode(String empCode) {
		this.empCode = empCode;
	}

	public String getBasicSalary() {
		return basicSalary;
	}

	public void setBasicSalary(String basicSalary) {
		this.basicSalary = basicSalary;
	}

	public String getPositionSalary() {
		return positionSalary;
	}

	public void setPositionSalary(String positionSalary) {
		this.positionSalary = positionSalary;
	}

	public String getFamilySalary() {
		return familySalary;
	}

	public void setFamilySalary(String familySalary) {
		this.familySalary = familySalary;
	}

	public String getMealSalary() {
		return mealSalary;
	}

	public void setMealSalary(String mealSalary) {
		this.mealSalary = mealSalary;
	}

	public String getBenefit() {
		return benefit;
	}

	public void setBenefit(String benefit) {
		this.benefit = benefit;
	}

	public String getTotalExtSal() {
		return totalExtSal;
	}

	public void setTotalExtSal(String totalExtSal) {
		this.totalExtSal = totalExtSal;
	}

	public String getTotalDeduction() {
		return totalDeduction;
	}

	public void setTotalDeduction(String totalDeduction) {
		this.totalDeduction = totalDeduction;
	}

	public String getRealSalary() {
		return realSalary;
	}

	public void setRealSalary(String realSalary) {
		this.realSalary = realSalary;
	}
}
	