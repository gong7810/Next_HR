package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpEvalTO;

@Mapper
public interface EmpEvalMapper {

	public ArrayList<EmpEvalTO> selectEmpEval();
	public void insertEmpEval(EmpEvalTO empevalto);
	public List<EmpEvalTO> selectValidEmpEvalList(String authLevel);
	public List<EmpEvalTO> selectEmpEvalListByApprovalStatus();
	public List<EmpEvalTO> selectEmpEvalByApprovalStatusCondition(String approvalStatus);
	public List<EmpEvalTO> selectEmpEvalList();
	public String selectEmpEvalByEmpCode(String empCode);
	public void updateEmpEval(EmpEvalTO empEvalTO);
	public void deleteEmpEval(EmpEvalTO empEvalTO);
	public ArrayList<EmpEvalTO> selectEmpEvalDept(HashMap<String, String> map);

}
