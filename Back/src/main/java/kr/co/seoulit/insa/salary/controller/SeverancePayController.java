package kr.co.seoulit.insa.salary.controller;

import kr.co.seoulit.insa.salary.service.SalaryService;
import kr.co.seoulit.insa.salary.to.SeverancePayTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("hr/salary/*")
public class SeverancePayController {

    @Autowired
    private SalaryService salaryService;

    //퇴직금 조회
    @GetMapping("severance")
    public HashMap<String, Object> findSeverancePayList(@RequestParam("empCode") String empCode) {

        HashMap<String, Object> map = new HashMap<>();
        System.out.println("퇴직금조회 옴?" + empCode);
        try {
            ArrayList<SeverancePayTO> severanceList =  salaryService.findSeverancePayList(empCode);
            map.put("severanceList", severanceList);
            map.put("errorCode", "조회 성공");
        } catch (Exception e) {
            map.clear();
            map.put("errorCode", "failed");
            map.put("errorMsg", e.getMessage());
        }
        return map;
    }

    //퇴직금 등록
    @PostMapping("/severance")
    public HashMap<String, Object> registSeverancePay(@RequestBody SeverancePayTO severancePayTO) {

        HashMap<String, Object> map = new HashMap<>();
        System.out.println("퇴직금등록 옴?");
        try {
            salaryService.registSeverancePay(severancePayTO);
            map.put("errorCode", "등록 성공");
        } catch (Exception ioe) {
            map.put("errorCode", "failed");
            map.put("errorMsg", ioe.getMessage());
        }
        return map;
    }

    // 퇴직금 삭제
    @DeleteMapping("/severance")
    public HashMap<String, Object> deleteSeverancePay(@RequestBody HashMap<String, ArrayList<SeverancePayTO>> severancePayMap) {

        HashMap<String, Object> map = new HashMap<>();
        ArrayList<SeverancePayTO> severanceList = severancePayMap.get("selectRowData");
        System.out.println("퇴직금삭제 옴?");
        try{
            salaryService.deleteSeverancePay(severanceList);
            map.put("errorMsg", "삭제 성공");
        } catch (Exception e) {
            map.clear();
            map.put("errorCode", "failed");
            map.put("errorMsg", e.getMessage());
        }
        return map;
    }
}
