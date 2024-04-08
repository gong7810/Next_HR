package kr.co.seoulit.insa.salary.service;

import kr.co.seoulit.insa.salary.to.SeverancePayTO;

import java.util.ArrayList;

public interface SalaryService {

    // 퇴직금 조회
    public ArrayList<SeverancePayTO> findSeverancePayList(String empCode);

    // 퇴직금 등록
    public void registSeverancePay(SeverancePayTO severancePayTO);

    // 퇴직금 삭제
    public void deleteSeverancePay(ArrayList<SeverancePayTO> severanceList);
}
