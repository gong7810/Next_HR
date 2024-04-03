package kr.co.seoulit.insa.commsvc.systemmgmt.controller;


import kr.co.seoulit.insa.commsvc.systemmgmt.service.SystemMgmtService;
import kr.co.seoulit.insa.commsvc.systemmgmt.to.AuthTO;
import kr.co.seoulit.insa.commsvc.systemmgmt.to.DetailCodeTO;
import org.apache.xmlbeans.impl.soap.Detail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;

@CrossOrigin("*")
@RequestMapping("/hr/base/*")
@RestController
public class HrSystemController {

    @Autowired
    private SystemMgmtService systemMgmtService;

    // 권한 조회
    @GetMapping("authLevel")
    public HashMap<String, Object> findAuthList() {

        HashMap<String, Object> map = new HashMap<>();

        try {
            ArrayList<AuthTO> authList = systemMgmtService.getAuthList();
            map.put("list", authList);
        } catch (Exception e) {
            map.put("errorCode", "failed");
            map.put("errorMsg", e.getMessage());
        }

        return map;
    }

    // 권한 조회
    @GetMapping("detailCode")
    public HashMap<String, Object> findCodeList() {

        HashMap<String, Object> map = new HashMap<>();

        try {
            ArrayList<DetailCodeTO> codeList = systemMgmtService.getCodeList();
            map.put("list", codeList);
        } catch (Exception e) {
            map.put("errorCode", "failed");
            map.put("errorMsg", e.getMessage());
        }

        return map;
    }
}
