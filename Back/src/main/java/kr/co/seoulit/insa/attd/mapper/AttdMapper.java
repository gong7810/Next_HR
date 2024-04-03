package kr.co.seoulit.insa.attd.mapper;

import kr.co.seoulit.insa.attd.to.BreakAttdTO;
import kr.co.seoulit.insa.attd.to.RestAttdManageTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.HashMap;

@Mapper
public interface AttdMapper {

    // 근태외 조회
    public ArrayList<RestAttdManageTO> findRestAttdList(HashMap<String, String> params);

    // 최상위 근태외일렬번호 조회
    public String findRestAttdMaxNo(String requestDay);

    // 근태외 신청 + 연차 신청
    public void registRestAttd(RestAttdManageTO restAttdManageTO);

    // 근태외 승인/취소
    public void updateRestAttd(RestAttdManageTO restAttdManageTO);

    // 근태외 삭제
    public void deleteRestAttd(RestAttdManageTO restAttdManageTO);

    // 연차 내역 조회
    public ArrayList<BreakAttdTO> findBreakAttdList(HashMap<String, String> map);

    // 연차 승인/반려
    public void updateBreakAttd(BreakAttdTO breakAttdTO);
}
