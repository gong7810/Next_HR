package kr.co.seoulit.insa.attd.service;

import kr.co.seoulit.insa.attd.to.RestAttdManageTO;

import java.util.ArrayList;

public interface AttdService{

    // 근태외 조회
    public ArrayList<RestAttdManageTO> selectRestAttdList();
}
