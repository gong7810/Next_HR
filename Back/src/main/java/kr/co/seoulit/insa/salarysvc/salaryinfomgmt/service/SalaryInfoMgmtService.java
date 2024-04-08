package kr.co.seoulit.insa.salarysvc.salaryinfomgmt.service;

import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.entity.FullTimeSalaryEntity;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.FullTimeSalTO;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.PayDayTO;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.RetirementSalaryTO;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.SalaryBonusTO;
import org.springframework.ui.ModelMap;

import java.util.ArrayList;
import java.util.List;

public interface SalaryInfoMgmtService {
	public List<FullTimeSalaryEntity> findselectSalary(String empCode);
	public ArrayList<FullTimeSalTO> findAllMoney(String empCode);
	public ArrayList<PayDayTO> findPayDayList();
	public void modifyFullTimeSalary(List<FullTimeSalTO> fullTimeSalary);
	public ArrayList<RetirementSalaryTO> findretirementSalaryList(String empCode);
	public ArrayList<SalaryBonusTO> findBonusSalary(String empCode);
	public ArrayList<FullTimeSalTO> findSalary();
	public void modifySalaryAward(ModelMap map);

}
