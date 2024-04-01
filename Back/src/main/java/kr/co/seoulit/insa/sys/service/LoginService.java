package kr.co.seoulit.insa.sys.service;

import kr.co.seoulit.insa.sys.to.LoginTO;

import java.util.HashMap;

public interface LoginService {

    public HashMap<String, Object> Login(LoginTO loginTO);

    public String getAuthLevel(LoginTO loginTO);
}
