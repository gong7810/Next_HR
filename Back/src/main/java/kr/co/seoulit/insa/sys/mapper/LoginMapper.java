package kr.co.seoulit.insa.sys.mapper;

import kr.co.seoulit.insa.sys.to.LoginTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface LoginMapper {

    public String getAuthLevel(String empCode);

    public LoginTO getUserName(String empCode);
}
