package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.mapper;

import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpAppointmentInfoTO;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpAppointmentRegTO;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpAppointmentTO;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpAppointmentTypeTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Mapper
public interface EmpAppointmentMapper {

    public String getHosu();

    public void insertEmpAppointment(EmpAppointmentRegTO empAppointmentRegTO);

    public ArrayList<EmpAppointmentInfoTO> findAppointmentInfo();

    public ArrayList<EmpAppointmentTO> findAppointmentEmpList();

    public ArrayList<EmpAppointmentTO> selectAllAppointmentList();

    public ArrayList<EmpAppointmentTO> selectApprovedOrRejectedAppointment();

    public ArrayList<EmpAppointmentTO> testSelect();

    public void updateAppointmentEmp(Map<String, Object> map);

    public void updateAppointmentInfo(Map<String, Object> map);



    public void updateEmpDeptCode(Map<String, Object> map);

    public void updateEmpPositionCode(Map<String, Object> map);

    public void updateDeptMoveNextDept(Map<String, Object> map);

    public void updatePositionPromotionNextPosition(Map<String, Object> map);


    // 아래의 코드들은 아직 사용하지 않는다.

    public EmpAppointmentTO selectAppointmentInfoEmp(Map<String, Object> map);

    public ArrayList<EmpAppointmentTypeTO> selectAllAppointEmp(String hosu);

    public EmpAppointmentTO countAppointmentEmp(String hosu);


    public ArrayList<EmpAppointmentTO> selectAppointmentList();

    public ArrayList<EmpAppointmentTO> selectDetailAppointmentList(String hosu);




}
