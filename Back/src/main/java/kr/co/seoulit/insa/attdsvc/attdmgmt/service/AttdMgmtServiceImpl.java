package kr.co.seoulit.insa.attdsvc.attdmgmt.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import kr.co.seoulit.insa.attdsvc.attdmgmt.to.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kr.co.seoulit.insa.attdsvc.attdmgmt.mapper.DailyAttndMapper;
import kr.co.seoulit.insa.attdsvc.attdmgmt.mapper.ExcusedAttndMapper;
import kr.co.seoulit.insa.commsvc.systemmgmt.to.ResultTO;
import org.springframework.ui.ModelMap;

@Service
public class AttdMgmtServiceImpl implements AttdMgmtService {
	
	@Autowired
	private DailyAttndMapper dayAttndMapper;
	@Autowired
	private ExcusedAttndMapper restAttdMapper;

	@Override
	public ArrayList<DayAttdTO> findDayAttdList(String empCode, String applyDay) {
		
		HashMap<String , Object> map = new HashMap<>();
		map.put("empCode", empCode);
		map.put("applyDay", applyDay);
		
		ArrayList<DayAttdTO> dayAttdList = null;
		dayAttdList = dayAttndMapper.selectDayAttdList(map);
		return dayAttdList;

	}

	
	@Override
	public ResultTO registDayAttd(DayAttdTO dayAttd) {
		
		HashMap<String , Object> map = new HashMap<>(); 
		map.put("empCode",dayAttd.getEmpCode());
		map.put("attdTypeCode",dayAttd.getAttdTypeCode());
		map.put("attdTypeName",dayAttd.getAttdTypeName());
		map.put("applyDay",dayAttd.getApplyDay());
		map.
				put("time",dayAttd.getTime());

		System.out.println("레지스트데이에티드");
		System.out.println(map);

		dayAttndMapper.batchInsertDayAttd(map);
		ResultTO resultTO = new ResultTO();
		resultTO.setErrorCode((String) map.get("errorCode"));
		resultTO.setErrorMsg((String) map.get("errorMsg")); 
		return resultTO;

	}

	@Override
	public void removeDayAttdList(ArrayList<DayAttdTO> dayAttdList) {

		for (DayAttdTO dayAttd : dayAttdList) {
			dayAttndMapper.deleteDayAttd(dayAttd);
		}
	}

	@Override
	public void insertDayAttd(DailyAttdTO dailyAttdTO) {
		dayAttndMapper.insertDayAttd(dailyAttdTO);
	}


	@Override
	public ArrayList<DailyAttdSearchResTO> searchDayAttd(DailyAttdSearchReqTO dailyAttdSearchReqTO) {
		System.out.println("서비스단으로 넘어온 searchDayAttdMap: " + dailyAttdSearchReqTO);
		System.out.println("type : " + dailyAttdSearchReqTO.getType());
		ArrayList<DailyAttdSearchResTO> list = new ArrayList<>();
		if(dailyAttdSearchReqTO.getType().equals("less")) {
			list = dayAttndMapper.selectAllDayAttd(dailyAttdSearchReqTO);
		} else if (dailyAttdSearchReqTO.getType().equals("under")) {
			list = dayAttndMapper.selectDayAttd(dailyAttdSearchReqTO);
		}
		System.out.println("리스트: " + list);
		for(DailyAttdSearchResTO bean: list){
			System.out.println("받아온 사원명: " + bean.getEmpName());
		}
		return list;
	}

	@Override
	public void modifyDailyAttd(DailyAttdModifyTO dailyAttdModifyTO){
		System.out.println("서비스단으로 넘어온 DailyAttdModifyTO: " + dailyAttdModifyTO);
		dayAttndMapper.updateDayAttd(dailyAttdModifyTO);
	}
	@Override
	public void finalizeDailyAttd(List<DailyAttdSearchResTO> selectedAttdList){
		System.out.println("서비스단으로 넘어온 DailyAttdModifyTO: " + selectedAttdList);
		for(DailyAttdSearchResTO selectedAttd: selectedAttdList){
			dayAttndMapper.updateFinalizeStatus(selectedAttd);
		}

	}


	@Override
	public ArrayList<RestAttdTO> findRestAttdList(String empCode, String startDate, String endDate, String code) {
		
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("empCode", empCode);
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		map.put("code", code);
		ArrayList<RestAttdTO> restAttdList = null;

		if (code == "")
			restAttdList = restAttdMapper.selectRestAttdList(map);
		else
			restAttdList = restAttdMapper.selectRestAttdListCode(map);

		return restAttdList;
	}

	@Override
	public void registRestAttd(ModelMap map) {
		restAttdMapper.insertRestAttd(map);

	}

	@Override
	public void removeRestAttdList(ArrayList<RestAttdTO> restAttdList) {

		for (RestAttdTO restAttd : restAttdList) {
			restAttdMapper.deleteRestAttd(restAttd);
		}
	}

}
