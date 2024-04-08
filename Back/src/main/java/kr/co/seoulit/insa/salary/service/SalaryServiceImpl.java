package kr.co.seoulit.insa.salary.service;

import kr.co.seoulit.insa.salary.mapper.SeverancePayMapper;
import kr.co.seoulit.insa.salary.to.SeverancePayTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;

@Service
public class SalaryServiceImpl implements SalaryService {

    @Autowired
    private SeverancePayMapper severancePayMapper;

    // 퇴직금 조회
    @Override
    public ArrayList<SeverancePayTO> findSeverancePayList(String empCode) {

        HashMap<String, String> params = new HashMap<>();
        System.out.println("퇴직금 조회 되냐?");
        params.put("empCode", empCode);

        ArrayList<SeverancePayTO> severanceList = severancePayMapper.findSeverancePayList(params);

        return severanceList;

    }

    // 퇴직금 등록
    @Override
    public void registSeverancePay(SeverancePayTO severancePayTO) {
        severancePayMapper.registSeverancePay(severancePayTO);
        System.out.println("퇴직금 등록 되냐?");
    }

    // 퇴직금 삭제
    @Override
    public void deleteSeverancePay(ArrayList<SeverancePayTO> severanceList) {

        for (SeverancePayTO severancePayTO : severanceList) {
            severancePayMapper.deleteSeverancePay(severancePayTO);
        System.out.println("퇴직금 삭제 되냐?");
        }
    }
}