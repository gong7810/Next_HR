package kr.co.seoulit.insa.salary.mapper;

import kr.co.seoulit.insa.salary.to.SeverancePayTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.HashMap;

@Mapper
public interface SeverancePayMapper {

    //퇴직금 조회
    public ArrayList<SeverancePayTO> findSeverancePayList(HashMap<String, String> params);

    // 퇴직금 등록
    public void registSeverancePay(SeverancePayTO severancePayTO);

    // 퇴직금 삭제
    public void deleteSeverancePay(SeverancePayTO severancePayTO);
}
