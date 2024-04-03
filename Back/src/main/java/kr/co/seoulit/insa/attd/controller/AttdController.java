package kr.co.seoulit.insa.attd.controller;


import kr.co.seoulit.insa.attd.service.AttdService;
import kr.co.seoulit.insa.attd.to.BreakAttdTO;
import kr.co.seoulit.insa.attd.to.RestAttdManageTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/hr/attendance/*")
public class AttdController {

    @Autowired
    private AttdService attdService;

    // 근태외 관리 조회
    @GetMapping("/restAttd")
    public HashMap<String, Object> findRestAttdList(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate,
                                                    @RequestParam("deptCode") String deptCode, @RequestParam("authLevel") String authLevel) {

        HashMap<String, Object> map = new HashMap<>();
        System.out.println("데이터 도착" + startDate + endDate + deptCode + authLevel);
        try {
            ArrayList<RestAttdManageTO> restAttdList =  attdService.findRestAttdList(startDate, endDate, deptCode, authLevel);
            map.put("restAttdList", restAttdList);
            map.put("errorCode", "조회 성공");
        } catch (Exception e) {
            map.clear();
            map.put("errorCode", "failed");
            map.put("errorMsg", e.getMessage());
        }
        return map;
    }

    // 근태외 신청
    @PostMapping("/restAttd")
    public HashMap<String, Object> registRestAttd(@RequestBody RestAttdManageTO restAttdManageTO) {

        HashMap<String, Object> map = new HashMap<>();

        try{
            attdService.registRestAttd(restAttdManageTO);
            map.put("errorCode", "등록 성공");
        } catch (Exception e) {
            map.put("errorCode", "failed");
            map.put("errorMsg", e.getMessage());
        }
        return map;
    }

    // 근태외 승인/취소
    @PutMapping("/restAttd")
    public HashMap<String, Object> updateRestAttdList(@RequestBody HashMap<String, ArrayList<RestAttdManageTO>> restAttdMap){

        HashMap<String, Object> map = new HashMap<>();
        ArrayList<RestAttdManageTO> restAttdList = restAttdMap.get("data");

        try {
            attdService.updateRestAttdList(restAttdList);
            map.put("errorMsg","승인/취소 성공");
        } catch (Exception e){
            map.clear();
            map.put("errorCode", "failed");
            map.put("errorMsg", e.getMessage());
        }
        return map;
    }

    // 근태외 삭제
    @DeleteMapping("/restAttd")
    public HashMap<String, Object> deleteRestAttdList(@RequestBody HashMap<String, ArrayList<RestAttdManageTO>> restAttdMap) {

        HashMap<String, Object> map = new HashMap<>();
        ArrayList<RestAttdManageTO> restAttdList = restAttdMap.get("selectRowData");

        try{
            attdService.deleteRestAttdList(restAttdList);
            map.put("errorMsg", "삭제 성공");
        } catch (Exception e) {
            map.clear();
            map.put("errorCode", "failed");
            map.put("errorMsg", e.getMessage());
        }
        return map;
    }

    // 연차 조회
    @GetMapping("breakAttd")
    public HashMap<String, Object> findBreakAttdList(@RequestParam("selectMonth") String selectMonth,
                                                     @RequestParam("authLevel") String authLevel) {

        HashMap<String, Object> map = new HashMap<>();

        try {
            ArrayList<BreakAttdTO> breakAttdList = attdService.findBreakAttdList(selectMonth, authLevel);
            map.put("breakAttdList", breakAttdList);
            map.put("errorCode", "조회 성공");
        } catch (Exception e) {
            map.put("errorCode", "failed");
            map.put("errorMsg", e.getMessage());
        }
        return map;
    }

    // 연차 신청
    @PostMapping("breakAttd")
    public HashMap<String, Object> registBreakAttd(@RequestBody RestAttdManageTO breakAttdTO) {

        HashMap<String,Object> map = new HashMap<>();

        try {
            attdService.registBreakAttd(breakAttdTO);
            map.put("errorMsg", "신청 성공");
        } catch (Exception e) {
            map.clear();
            map.put("errorCode", "failed");
            map.put("errorMsg", e.getMessage());
        }
        return map;
    }

    // 연차 승인/반려
    @PutMapping("/breakAttd")
    public HashMap<String, Object> updateBreakAttdList(@RequestBody HashMap<String, ArrayList<BreakAttdTO>> breakAttdMap){

        HashMap<String, Object> map = new HashMap<>();
        ArrayList<BreakAttdTO> breakAttdList = breakAttdMap.get("data");

        try {
            attdService.updateBreakAttdList(breakAttdList);
            map.put("errorMsg","승인/반려 성공");
        } catch (Exception e){
            map.clear();
            map.put("errorCode", "failed");
            map.put("errorMsg", e.getMessage());
        }
        return map;
    }

    // 연차 삭제
    @DeleteMapping("/breakAttd")
    public HashMap<String, Object> deleteBreakAttdList(@RequestBody HashMap<String, ArrayList<BreakAttdTO>> breakAttdMap) {

        HashMap<String, Object> map = new HashMap<>();
        ArrayList<BreakAttdTO> breakAttdList = breakAttdMap.get("selectedRow");

        try{
            attdService.deleteBreakAttdList(breakAttdList);
            map.put("errorMsg", "삭제 성공");
        } catch (Exception e) {
            map.clear();
            map.put("errorCode", "failed");
            map.put("errorMsg", e.getMessage());
        }
        return map;
    }
}
