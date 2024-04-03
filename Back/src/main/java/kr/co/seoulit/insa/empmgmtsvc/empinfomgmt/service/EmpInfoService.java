package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import kr.co.seoulit.insa.commsvc.foudinfomgmt.to.DeptTO;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.entity.EmpDetailEntity;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.*;

public interface EmpInfoService {

    //  사원 관리 관련


    public void registEmployee(EmpTO empto);

    public EmpTO findAllEmpInfo(String empCode);

    // 본인직급 이하 사원 조회
    public List<EmpDetailEntity> findEmpList(String deptCode, String authLevel); //findEmployeeListByDept

    // 전체 사원 조회
    public List<EmpDetailEntity> findEmpAllList(String deptCode); //findEmployeeListByDept


    public void modifyEmployee(EmpTO empTO);

    public String findEmpCode(String empName, String deptCode);

    public void removeEmployee(List<EmpDetailEntity> empDetailEntities);





    //사원 평가 관련


    public void registEmpEval(EmpEvalTO empevalto);

    public List<EmpEvalTO> findValidEmpEvalList(String authLevel);

    public List<EmpEvalTO> findEmpEvalListByApprovalStatus();

    public List<EmpEvalTO> findEmpEvalByApprovalStatusCondition(String approvalStatus);

    public List<EmpEvalTO> findEmpEvalList();

    public ArrayList<EmpEvalTO> findEmpEval();

    public ArrayList<EmpEvalTO> findEmpEval(String dept, String year);

    public void removeEmpEvalList(List<EmpEvalTO> empEvalTO);

    public void modifyApprovedEmpEval(List<EmpEvalTO> empEvalTO);

    public void modifyRejectedEmpEval(List<EmpEvalTO> empEvalTO);


    // 인사 발령 관련


    public String getHosu();


    public void registAppoint(EmpAppointmentRegTO empAppointmentRegTO);

    public ArrayList<EmpAppointmentTO> findAppointmentEmpList();


    public ArrayList<EmpAppointmentTO> findAllAppointmentList();

    public ArrayList<EmpAppointmentTO> selectApprovedOrRejectedAppointment();

    public void modifyRejectedAppointmentEmp(List<EmpAppointmentTO> empAppointmentTO);
    public void modifyApprovedAppointmentEmp(List<EmpAppointmentTO> empAppointmentTO);

    // 아래의 코드들은 아직까지 사용하지 않는다.

    public ArrayList<EmpAppointmentTypeTO> findAllAppointEmp(String hosu);

    public EmpAppointmentTO countAppointmentEmp(String hosu);



    public ArrayList<EmpAppointmentTO> findAppointmentList();

    public ArrayList<EmpAppointmentTO> findDetailAppointmentList(String hosu);




    public ArrayList<EmpTO> findEmprealList();
}