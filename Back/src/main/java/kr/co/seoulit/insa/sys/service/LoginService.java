package kr.co.seoulit.insa.sys.service;

import kr.co.seoulit.insa.sys.to.LoginTO;

import java.util.HashMap;

public interface LoginService {

    public Boolean Login(LoginTO loginTO);

    public String getAuthLevel(LoginTO loginTO);
}
