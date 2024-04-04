package kr.co.seoulit.insa.attdsvc.attdmgmt.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import kr.co.seoulit.insa.attdsvc.attdmgmt.to.*;
import org.apache.ibatis.annotations.Mapper;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.ResultTO;
@Mapper
public interface DailyAttndMapper {
	public ArrayList<DayAttdTO> selectDayAttdList(HashMap<String , Object> map);

	public ResultTO batchInsertDayAttd(HashMap<String , Object> map);

	public ResultTO batchInsertDayAttd2(HashMap<String , Object> map);

	public void insertDayAttd(DailyAttdTO dailyAttdTO);

	// 일근태 등록페이지 조회
	public ArrayList<DailyAttdSearchResTO> selectAllDayAttd(DailyAttdSearchReqTO dailyAttdSearchReqTO);

	// 일근태 관리페이지 조회
	public ArrayList<DailyAttdSearchResTO> selectDayAttd(DailyAttdSearchReqTO dailyAttdSearchReqTO);

	public void updateDayAttd(DailyAttdModifyTO dailyAttdModifyTO);

	public void deleteDayAttd(DayAttdTO dayAttd);

	public void updateFinalizeStatus(DailyAttdSearchResTO dailyAttdSearchResTO);
}
