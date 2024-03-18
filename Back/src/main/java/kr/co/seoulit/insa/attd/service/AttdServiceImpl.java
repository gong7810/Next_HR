package kr.co.seoulit.insa.attd.service;

import kr.co.seoulit.insa.attd.mapper.AttdMapper;
import kr.co.seoulit.insa.attd.to.RestAttdManageTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AttdServiceImpl implements AttdService {

    @Autowired
    private AttdMapper attdMapper;

    // 근태외 조회
    @Override
    public ArrayList<RestAttdManageTO> selectRestAttdList() {

        ArrayList<RestAttdManageTO> restAttdList = attdMapper.selectRestAttdList();

        return restAttdList;

    }
}
