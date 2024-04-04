package kr.co.seoulit.insa.salarysvc.salaryinfomgmt.mapper;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.RetirementSalaryTO;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.RegistRetirementTO;
import org.springframework.ui.ModelMap;

@Mapper
public interface RetirementSalMapper {

	//토직금 조회
	public ArrayList<RetirementSalaryTO> selectretirementSalaryList(String empCode);

	//퇴직금 등록
	public void registRetirementPay(RegistRetirementTO registRetirementTO);
}
