package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.controller;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.service.EmpInfoService;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpAppointmentInfoTO;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpAppointmentRegTO;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpAppointmentTO;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpAppointmentTypeTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/empinfomgmt")
@RestController
@CrossOrigin
public class EmpAppointmentController {

    @Autowired
    private EmpInfoService empInfoService;
    ModelMap map = null;


    //특정 호수의 발령 현황을 조회하는 로직
    @GetMapping("/appointmentemp")
    public ModelMap findAllAppointEmp(@RequestParam("hosu") String hosu, HttpServletResponse response) {

        map = new ModelMap();
        try {
            ArrayList<EmpAppointmentTypeTO> list = empInfoService.findAllAppointEmp(hosu);
            EmpAppointmentTO list1 = empInfoService.countAppointmentEmp(hosu);
            map.put("list", list);
            map.put("countlist", list1);
        } catch (Exception e) {
            map.put("errorCode", -1);
            map.put("errorMsg", e.getMessage());
        }
        return map;
    }


    //이거는 정상 작동한다.
    @GetMapping("/gethosu")
    public Map<String, Object> registhosu() {

        Map<String, Object> map = new HashMap<>();
        try {
            String hosu = empInfoService.getHosu();
            map.put("hosu", hosu); // 프론트에서 호수만 받아서 작업을 할수 있게한다.
            map.put("errorCode", 0);
            map.put("errorMsg", "succeed");
        } catch (Exception e) {
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", "failed");
        }
        return map;
    }


    // 인사발령 등록
    @PostMapping("/registAppoint")
    public Map<String, Object> registAppointment(@RequestBody EmpAppointmentRegTO empAppointmentRegTO) {
        Map<String, Object> map = new HashMap<>();
        System.out.println("<<<<<<<<<<<< empAppointmentRegTO = " + empAppointmentRegTO);
        try {


            empInfoService.registAppoint(empAppointmentRegTO);

            map.put("errorCode", 0);
            map.put("errorMsg", "succeed");
        } catch (Exception e) {
            e.printStackTrace();
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", "failed");
        }
        return map;
    }


    @GetMapping("/appointmentEmpList")
    public Map<String, Object> findAppointmentEmpList() {
        Map<String, Object> map = new HashMap<>();

        try {
            ArrayList<EmpAppointmentTO> list = empInfoService.findAllAppointmentList();
            map.put("list", list);
            map.put("errorCode", 0);
            map.put("errorMsg", "succeed");
        } catch (Exception e) {
            e.printStackTrace();
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", "failed");

        }

        return map;

    }

    // get은 쿼리스트링으로 데이터를 받고, 컨트롤러에서 필수여부와 갑이 들어오지 않았을때의 기본값을 설정해줄수 있음.
    @GetMapping("/appointment/approved_rejected")
    public Map<String, Object> selectApprovedOrRejectedAppointment() {

        Map<String, Object> map = new HashMap<>();

        try {

            ArrayList<EmpAppointmentTO> list = empInfoService.selectApprovedOrRejectedAppointment();
            map.put("errorCode", 0);
            map.put("errorMsg", "succeed");
            map.put("list", list);


        } catch (Exception e) {
            e.printStackTrace();
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", "failed");

        }

        return map;
    }


    // 승인된 인사발령목록을 받는 컨트롤러
    // 타입은 서비스 단에서 찾는다.
    @PutMapping("/appointment/approve")
    public Map<String, Object> modifyApprovedAppointment(@RequestBody List<EmpAppointmentTO> empAppointmentTO) {
        Map<String, Object> map = new HashMap<>();
        System.out.println("<<<<<<<<<<<<<<<<<<< approvedEmpAppointmentTO  = " + empAppointmentTO);

        try {
            empInfoService.modifyApprovedAppointmentEmp(empAppointmentTO);
            map.put("errorCode", 0);
            map.put("errorMsg", "succeed");


        } catch (Exception e) {
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", "failed");


        }


        return map;
    }

    //반려된 인사발령 목록을 받는 컨트롤러
    // 타입은 서비스 단에서 찾는다.
    @PutMapping("/appointment/reject")
    public Map<String, Object> modifyRejectedAppointment(@RequestBody List<EmpAppointmentTO> empAppointmentTO) {
        System.out.println("<<<<<<<<<<<<<<<<<< rejected empAppointmentTO = " + empAppointmentTO);
        Map<String, Object> map = new HashMap<>();

        try {
            empInfoService.modifyRejectedAppointmentEmp(empAppointmentTO);
            map.put("errorCode", 0);
            map.put("errorMsg", "succeed");


        } catch (Exception e) {
            e.printStackTrace();
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", "failed");


        }

        return map;

    }


    //아래의 코드들은 사용하지 않습니다.
    //---> 아마도 모두 삭제할 예정 입니다.
    // 여기에서 실행하는 쿼리문에서는 empCode를 가지고 오지 않는다.

    @GetMapping("/findAppointmentList")
    public Map<String, Object> findAppointmentList() {
        Map<String, Object> map = new HashMap<>();
        try {
            ArrayList<EmpAppointmentTO> appointmentList = empInfoService.findAppointmentList();
            map.put("appointmentList", appointmentList);
            map.put("errorMsg", "success");
            map.put("errorCode", 0);

        } catch (Exception dae) {
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", "failed");
        }

        return map;
    }


    // 아래의 코드도 사용하지 않을거 같다.
    @GetMapping("/")
    public ModelMap findDetailAppointmentList(HttpServletRequest request, HttpServletResponse response) {
        map = new ModelMap();
        try {
            String sendData = request.getParameter("sendData");
            ArrayList<EmpAppointmentTO> detailAppointmentList = empInfoService.findDetailAppointmentList(sendData);
            map.put("detailAppointmentList", detailAppointmentList);
            map.put("errorMsg", "success");
            map.put("errorCode", 0);

        } catch (Exception dae) {
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", dae.getMessage());
        }

        return map;
    }





}
