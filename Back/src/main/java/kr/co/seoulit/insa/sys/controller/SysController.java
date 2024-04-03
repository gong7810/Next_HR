package kr.co.seoulit.insa.sys.controller;

import kr.co.seoulit.insa.sys.security.SecurityService;
import kr.co.seoulit.insa.sys.service.LoginService;
import kr.co.seoulit.insa.sys.to.LoginTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.LinkedHashMap;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/hr/login/*")
public class SysController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private SecurityService securityService;

    @GetMapping("/login")      // id를 subject에, pw도 key로 던져주는 post방식으로 하는게 정석
    public HashMap<String, Object> login(@RequestParam("id") String id,
                                         @RequestParam("pw") String pw) {

        System.out.println(id + ", " + pw);
        HashMap<String, Object> map = new LinkedHashMap<>();
        LoginTO loginTO = new LoginTO(id, id, pw);

        try {
            HashMap<String, Object> resultMap = loginService.Login(loginTO);
            if ((Boolean) resultMap.get("result")) {
                String token = securityService.createToken(id, (600*1000*60));
                String authLevel = loginService.getAuthLevel(loginTO);
                map.put("errorCode", "로그인 성공");
                map.put("accessToken", token);
                map.put("authLevel", authLevel);
                map.put("empName", resultMap.get("empName"));
                map.put("position", resultMap.get("position"));
            } else {
                map.put("errorCode", "login failed");
            }

        } catch (Exception e) {
            map.put("errorCode", "failed");
            map.put("errorMsg", e.getMessage());
        }
        return map;
    }

    @GetMapping("/token")
    public HashMap<String, Object> check(@RequestParam("token") String token) {

        HashMap<String, Object> map = new HashMap<>();
        System.out.println("token : "+ token);
        try {
            String result = securityService.getSubject(token);
            System.out.println(result);
            map.put("data", result);
        } catch (Exception e) {
            map.put("errorCode", "key is expired");
            map.put("errorMsg", e.getMessage());
        }

        return map;

    }
}
