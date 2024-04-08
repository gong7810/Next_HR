package kr.co.seoulit.insa.attd.service;

import kr.co.seoulit.insa.attd.mapper.AttdMapper;
import kr.co.seoulit.insa.attd.repository.AttdRepository;
import kr.co.seoulit.insa.attd.to.BreakAttdTO;
import kr.co.seoulit.insa.attd.to.RestAttdManageTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;

@Service
public class AttdServiceImpl implements AttdService {

    @Autowired
    private AttdMapper attdMapper;

    @Autowired
    private AttdRepository attdRepository;

    // 근태외 조회
    @Override
    public ArrayList<RestAttdManageTO> findRestAttdList(String startDate, String endDate, String deptCode, String authLevel) {

        HashMap<String, String> params = new HashMap<>();
        params.put("startDate", startDate);
        params.put("endDate", endDate);
        params.put("deptCode", deptCode);
        params.put("authLevel", authLevel);

        ArrayList<RestAttdManageTO> restAttdList = attdMapper.findRestAttdList(params);

        return restAttdList;

    }

    // 근태외 신청
    @Override
    public void registRestAttd(RestAttdManageTO restAttdManageTO) {

        StringBuffer restAttdNo = new StringBuffer();
        String restAttdNoDate = restAttdManageTO.getRequestDate().replace("-", "");
        restAttdNo.append(restAttdNoDate);
        restAttdNo.append("REST"); // 20240320REST

        String lastNo = attdMapper.findRestAttdMaxNo(restAttdNoDate);
        if (lastNo == null){
            lastNo = "00000";
        }

        int length = lastNo.length();

        String code = "0000" + (Integer.parseInt(lastNo.substring(length - 5)) + 1) + "";
        restAttdNo.append(code.substring(code.length() - 5)); // 20240320REST00001

        restAttdManageTO.setRestAttdNo(restAttdNo.toString());

        attdMapper.registRestAttd(restAttdManageTO);
    }

    // 근태외 승인/취소
    @Override
    public void updateRestAttdList(ArrayList<RestAttdManageTO> restAttdList) {

        for (RestAttdManageTO restAttdManageTO : restAttdList) {
            attdMapper.updateRestAttd(restAttdManageTO);
        }
    }

    // 근태외 삭제
    @Override
    public void deleteRestAttdList(ArrayList<RestAttdManageTO> restAttdList) {

        for (RestAttdManageTO restAttdManageTO : restAttdList) {
            attdMapper.deleteRestAttd(restAttdManageTO);
        }
    }

    // 연차 내역 조회
    @Override
    public ArrayList<BreakAttdTO> findBreakAttdList(String useDate, String authLevel) {

        HashMap<String, String> map = new HashMap<>();
        map.put("useDate", useDate);
        map.put("authLevel", authLevel);

        ArrayList<BreakAttdTO> breakAttdList = attdMapper.findBreakAttdList(map);

        return breakAttdList;
    }

    // 연차 신청
    @Override
    public void registBreakAttd(RestAttdManageTO breakAttdTO) {

        StringBuffer restAttdNo = new StringBuffer();
        String restAttdNoDate = breakAttdTO.getRequestDate().replace("-", "");
        restAttdNo.append(restAttdNoDate);
        restAttdNo.append("REST"); // 20240320REST

        String lastNo = attdMapper.findRestAttdMaxNo(restAttdNoDate);
        if (lastNo == null){
            lastNo = "00000";
        }

        int length = lastNo.length();

        String code = "0000" + (Integer.parseInt(lastNo.substring(length - 5)) + 1) + "";
        restAttdNo.append(code.substring(code.length() - 5)); // 20240320REST00001

        breakAttdTO.setRestAttdNo(restAttdNo.toString());

        attdMapper.registRestAttd(breakAttdTO);
    }

    // 연차 승인/반려
    @Override
    public void updateBreakAttdList(ArrayList<BreakAttdTO> breakAttdList) {

        for (BreakAttdTO breakAttdTO : breakAttdList) {
            attdMapper.updateBreakAttd(breakAttdTO);
        }
    }

    // 연차 삭제
    @Override
    public void deleteBreakAttdList(ArrayList<BreakAttdTO> breakAttdList) {

        for (BreakAttdTO breakAttdTO : breakAttdList) {
            attdRepository.deleteById(breakAttdTO.getRestAttdNo());
        }
    }
}
