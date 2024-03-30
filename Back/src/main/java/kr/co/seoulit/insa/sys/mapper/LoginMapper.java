package kr.co.seoulit.insa.sys.mapper;

import kr.co.seoulit.insa.sys.to.LoginTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {

    public String getAuthLevel(String empCode);
}
