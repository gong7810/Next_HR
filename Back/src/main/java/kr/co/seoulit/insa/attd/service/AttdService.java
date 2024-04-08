package kr.co.seoulit.insa.attd.service;

import kr.co.seoulit.insa.attd.to.BreakAttdTO;
import kr.co.seoulit.insa.attd.to.RestAttdManageTO;

import java.lang.reflect.Array;
import java.util.ArrayList;

public interface AttdService{

    // 근태외 조회
    public ArrayList<RestAttdManageTO> findRestAttdList(String startDate, String endDate, String deptCode, String authLevel);

    // 근태외 신청
    public void registRestAttd(RestAttdManageTO restAttdManageTO);

    // 근태외 승인/취소
    public void updateRestAttdList(ArrayList<RestAttdManageTO> restAttdList);

    // 근태외 삭제
    public void deleteRestAttdList(ArrayList<RestAttdManageTO> restAttdList);

    // 연차 내역 조회
    public ArrayList<BreakAttdTO> findBreakAttdList(String useDate, String authLevel);

    // 연차 신청
    public void registBreakAttd(RestAttdManageTO breakAttdTO);

    // 연차 승인/반려
    public void updateBreakAttdList(ArrayList<BreakAttdTO> breakAttdList);

    // 연차 삭제
    public void deleteBreakAttdList(ArrayList<BreakAttdTO> breakAttdList);
}
