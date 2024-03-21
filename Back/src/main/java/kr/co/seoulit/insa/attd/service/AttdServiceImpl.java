package kr.co.seoulit.insa.attd.service;

import kr.co.seoulit.insa.attd.mapper.AttdMapper;
import kr.co.seoulit.insa.attd.to.RestAttdManageTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;

@Service
public class AttdServiceImpl implements AttdService {

    @Autowired
    private AttdMapper attdMapper;

    // 근태외 조회
    @Override
    public ArrayList<RestAttdManageTO> findRestAttdList(String startDate, String endDate, String deptCode) {

        HashMap<String, String> params = new HashMap<>();
        params.put("startDate", startDate);
        params.put("endDate", endDate);
        params.put("deptCode", deptCode);

        ArrayList<RestAttdManageTO> restAttdList = attdMapper.findRestAttdList(params);

        return restAttdList;

    }

    // 근태외 등록
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
}
