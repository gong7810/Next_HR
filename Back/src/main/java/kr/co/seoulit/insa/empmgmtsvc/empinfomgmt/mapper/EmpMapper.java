package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpCodeSearchTO;
import org.apache.ibatis.annotations.Mapper;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpTO;

@Mapper
public interface EmpMapper {


	public EmpTO selectEmp(String empName);
	public String selectLastEmpCode();
	public ArrayList<EmpTO> selectEmpList();

	public ArrayList<EmpTO> selectEmpListN(String deptCode);

	public String getEmpCode(String name);
	public EmpTO selectEmployee(String empCode);
	public void registEmployee(HashMap<String,String> map); //
	public void updateEmployee(EmpTO emp);
	public void deleteEmployee(String empCode);
	public String selectEmpCode(String empName, String deptCode);
}
