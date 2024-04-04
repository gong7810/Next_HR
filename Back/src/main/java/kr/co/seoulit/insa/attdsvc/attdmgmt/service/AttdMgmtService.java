package kr.co.seoulit.insa.attdsvc.attdmgmt.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import kr.co.seoulit.insa.attdsvc.attdmgmt.to.*;
import kr.co.seoulit.insa.commsvc.systemmgmt.to.ResultTO;
import org.springframework.ui.ModelMap;

public interface AttdMgmtService {
	
	   public ArrayList<DayAttdTO> findDayAttdList(String empCode, String applyDay);
	   public ResultTO registDayAttd(DayAttdTO dayAttd);
	   public void removeDayAttdList(ArrayList<DayAttdTO> dayAttdList);
	   public void insertDayAttd(DailyAttdTO dailyAttdTO);
	   public ArrayList<DailyAttdSearchResTO> searchDayAttd(DailyAttdSearchReqTO dailyAttdSearchReqTO);
	   public ArrayList<RestAttdTO> findRestAttdList(String empCode, String startDate, String endDate, String code);
	   public void registRestAttd(ModelMap map);
	   public void removeRestAttdList(ArrayList<RestAttdTO> restAttdList);
	   public void modifyDailyAttd(DailyAttdModifyTO dailyAttdModifyTO);
	   public void finalizeDailyAttd(List<DailyAttdSearchResTO> selectedAttdList);
	   
}
