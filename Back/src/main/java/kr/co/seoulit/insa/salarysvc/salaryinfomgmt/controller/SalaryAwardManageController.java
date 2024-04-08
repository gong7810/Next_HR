package kr.co.seoulit.insa.salarysvc.salaryinfomgmt.controller;

import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.service.SalaryInfoMgmtService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

@RequestMapping("/hr/salaryinfomgmt/*")
@RestController
@CrossOrigin
public class SalaryAwardManageController {

    @Autowired
    private SalaryInfoMgmtService salaryInfoMgmtService;
    ModelMap map = null;
    ModelMap map2 = null;

    //@RequestMapping(value ="/salaryAward-manage" , method = {RequestMethod.POST, RequestMethod.GET})
    @PostMapping(value = "/salaryAward-manage")

    public ModelMap modifySalaryAward(
            @RequestBody HashMap<String, String> requestMap, HttpServletRequest request, HttpServletResponse response) {
        map = new ModelMap();

        String empCode = requestMap.get("empCode");
        String grade = requestMap.get("grade");
        map.put("empCode", empCode);
        map.put("grade", grade);

        System.out.println(empCode);
        System.out.println(grade);

        System.out.println("컨트롤라 : " + empCode + "  " + grade);

        try {

            map.put("errorMsg", "success");
            map.put("errorCode", 0);


            System.out.println("!!!!!!!!!!!!!!!!!!!!!" + map);

            salaryInfoMgmtService.modifySalaryAward(map);

        } catch (Exception dae) {
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", dae.getMessage());
        }
        return map;
    }
}