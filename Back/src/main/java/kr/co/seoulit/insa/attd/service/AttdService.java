package kr.co.seoulit.insa.attd.service;

import kr.co.seoulit.insa.attd.to.RestAttdManageTO;

import java.lang.reflect.Array;
import java.util.ArrayList;

public interface AttdService{

    // 근태외 조회
    public ArrayList<RestAttdManageTO> findRestAttdList(String startDate, String endDate, String deptCode);

    // 근태외 등록
    public void registRestAttd(RestAttdManageTO restAttdManageTO);

    // 근태외 승인/취소
    public void updateRestAttdList(ArrayList<RestAttdManageTO> restAttdList);

    // 근태외 삭제
    public void deleteRestAttdList(ArrayList<RestAttdManageTO> restAttdList);
}
