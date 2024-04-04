package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.entity.EmpDetailEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.service.EmpInfoService;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpTO;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.FamilyInfoTO;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.LicenseInfoTO;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.WorkInfoTO;


@RequestMapping("/empinfomgmt/*")
@RestController
@CrossOrigin
public class EmpDetailController {

    @Autowired
    private EmpInfoService empInfoService;




    //사원정보를 수정하는 로직
    @PutMapping("/empdetail/empcode")
    public Map<String, Object> modifyEmployee(@RequestBody EmpTO empTO) {
        System.out.println("empTO = " + empTO);
        Map<String,Object> map = new HashMap<>();

        try {
            empInfoService.modifyEmployee(empTO);
            map.put("errorMsg", "success");
            map.put("errorCode", 0);

        } catch (Exception dae) {
            dae.printStackTrace();
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", dae.getMessage());
        }
        return map;
    }

    // 삭제할 사원의 정보를 객체배열로 받아서 삭제한다.
    @DeleteMapping("/empdetail/empcode")
    public Map<String, Object> removeEmployeeList(@RequestBody List<EmpDetailEntity> empDetailEntities) {
        System.out.println("map = " + empDetailEntities);

        Map<String, Object> map = new HashMap<>();
        try {

            empInfoService.removeEmployee(empDetailEntities);
            map.put("errorCode", 0);
            map.put("errorMsg", "success");

        } catch (Exception dae) {
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", dae.getMessage());
        }

        return map;
    }
}
