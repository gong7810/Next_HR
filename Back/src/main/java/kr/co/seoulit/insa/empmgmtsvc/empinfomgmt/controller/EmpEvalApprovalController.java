package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.service.EmpInfoService;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpEvalTO;


@RequestMapping("/empinfomgmt/*")
@RestController
@CrossOrigin
public class EmpEvalApprovalController {

    @Autowired
    private EmpInfoService empInfoService;


    @GetMapping("/evaluation-approval")
    public ModelMap findEmpEvalAppoList(@RequestParam("demptName") String dept, @RequestParam("year") String year,
                                        HttpServletResponse response) {
        ModelMap map = null;
        map = new ModelMap();
        try {
            ArrayList<EmpEvalTO> empEvalList = empInfoService.findEmpEval(dept, year);
            map.put("empEvalList", empEvalList);
            map.put("errorMsg", "success");
            map.put("errorCode", 0);
        } catch (Exception dae) {
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", dae.getMessage());
        }
        return map;
    }


    // 여기서도 객체 배열로 받아서 처리를 하게 한다.
    @PutMapping("/evaluation-approval/approved")
    public Map<String, Object> modifyApprovedEmpEvalList(@RequestBody List<EmpEvalTO> empEvalTO) {

        System.out.println("<<<<<<<<<<<<< modify empEvalTO = " + empEvalTO);
        Map<String, Object> map = new HashMap<>();
		try{
			map.put("errorMsg", "success");
			map.put("errorCode", 0);

			empInfoService.modifyApprovedEmpEval(empEvalTO);
			return  map;
		}catch(Exception e){
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", "failed");
			e.printStackTrace();
            return map;

		}

    }


    @PostMapping("/evaluation-approval/rejected")
    public Map<String, Object> modifyRejectedEmpEvalList(@RequestBody List<EmpEvalTO> empEvalTO) {

        System.out.println("<<<<<<<<<<<<< modify empEvalTO = " + empEvalTO);

        Map<String, Object> map = new HashMap<>();
        try {
            map.put("errorMsg", "success");
            map.put("errorCode", 0);

            empInfoService.modifyRejectedEmpEval(empEvalTO);
            return map;
        } catch (Exception e) {
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", "failed");
            e.printStackTrace();
            return map;

        }

    }


}
