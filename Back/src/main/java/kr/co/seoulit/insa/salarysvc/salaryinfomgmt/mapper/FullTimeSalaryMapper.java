package kr.co.seoulit.insa.salarysvc.salaryinfomgmt.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import org.apache.ibatis.annotations.Mapper;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.FullTimeSalTO;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.PayDayTO;

@Mapper
public interface FullTimeSalaryMapper {

	public ArrayList<FullTimeSalTO> selectFullTimeSalary(String empCode);
	public ArrayList<FullTimeSalTO> findAllMoney(String empCode);
	public void updateFullTimeSalary(FullTimeSalTO fullTimeSalary);
	public ArrayList<PayDayTO> selectPayDayList();
	public ArrayList<FullTimeSalTO> findSalary();

}
