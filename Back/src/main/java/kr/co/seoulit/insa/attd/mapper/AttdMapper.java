package kr.co.seoulit.insa.attd.mapper;

import kr.co.seoulit.insa.attd.to.RestAttdManageTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface AttdMapper {

    // 근태외 조회
    public ArrayList<RestAttdManageTO> selectRestAttdList();
}
