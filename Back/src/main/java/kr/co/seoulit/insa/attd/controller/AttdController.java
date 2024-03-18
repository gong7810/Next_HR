package kr.co.seoulit.insa.attd.controller;


import kr.co.seoulit.insa.attd.service.AttdService;
import kr.co.seoulit.insa.attd.to.RestAttdManageTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Objects;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/hr/attendance/*")
public class AttdController {

    @Autowired
    private AttdService attdService;

    @GetMapping("/restAttd")
    public HashMap<String, Object> selectRestAttdList() {

        HashMap<String, Object> map = new HashMap<>();

        try {
            ArrayList<RestAttdManageTO> restAttdList =  attdService.selectRestAttdList();
            map.put("restAttdList", restAttdList);
            map.put("errorCode", "조회성공");
        } catch (Exception e) {
            map.clear();
            map.put("errorCode", "failed");
            map.put("errorMsg", e.getMessage());
        }

        return map;
    }
}
