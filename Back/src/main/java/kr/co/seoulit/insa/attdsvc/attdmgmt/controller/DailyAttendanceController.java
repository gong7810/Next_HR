package kr.co.seoulit.insa.attdsvc.attdmgmt.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.seoulit.insa.attdsvc.attdmgmt.to.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import kr.co.seoulit.insa.attdsvc.attdmgmt.service.AttdMgmtService;

@RestController
@RequestMapping("/hr/attdmgmt/*")
@CrossOrigin
public class DailyAttendanceController {
	
	@Autowired
	private AttdMgmtService attdMgmtService;
	ModelMap map = null;

	// 일근태 관리 조회
	@PostMapping("searchDailyAttnd")
	public Map<String, Object> findDayAttdList(@RequestBody HashMap<String, DailyAttdSearchReqTO> searchDayAttdMap) {
		System.out.println("<<<<<<<<<<< searchDayAttdMap = " + searchDayAttdMap);
		DailyAttdSearchReqTO dailyAttdSearchReqTO = searchDayAttdMap.get("data");
		Map<String, Object> map = new HashMap<>();

		try {
			ArrayList<DailyAttdSearchResTO> list = attdMgmtService.searchDayAttd(dailyAttdSearchReqTO);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);
			map.put("list", list);
		} catch (Exception e) {
			map.clear();
			map.put("errorMsg", e.getMessage());
			map.put("errorCode", -1);

		}
		return map;
	}


	//일근태를 수정하는 로직
	@PutMapping("updateDailyAttd")
	public Map<String, Object> modifyDayAttd(@RequestBody DailyAttdModifyTO dailyAttdModifyTO) {
		System.out.println("컨트롤러의 dailyAttdModifyTO = " + dailyAttdModifyTO);
		Map<String,Object> map = new HashMap<>();

		try {
			attdMgmtService.modifyDailyAttd(dailyAttdModifyTO);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);

		}catch (Exception dae){
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}

	//근태등록
	@PostMapping("daily-attnd")
	public ModelMap registDayAttd(HttpServletRequest request, HttpServletResponse response){
		
		map = new ModelMap();
		String sendData = request.getParameter("sendData");
		response.setContentType("application/json; charset=UTF-8");

		try {			
			Gson gson = new Gson();
			DayAttdTO dayAttd = gson.fromJson(sendData, DayAttdTO.class);
			ResultTO resultTO = attdMgmtService.registDayAttd(dayAttd);
			map.put("errorMsg",resultTO.getErrorMsg());
			map.put("errorCode", resultTO.getErrorCode());
			
		}catch (Exception dae){
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}

	//리엑트랑 연동
	@CrossOrigin
	@PostMapping("react-daily-attnd")
	public ModelMap reactRegistDayAttd(@RequestBody Map<String, String> dayAttdData){
		DayAttdTO dayAttd = new DayAttdTO();

		System.out.println("근태등록요청 도착 !");
		System.out.println(dayAttdData);
		System.out.println(dayAttdData.get("empCode"));
		System.out.println(dayAttdData.get("applyDay"));
		System.out.println(dayAttdData.get("attdType"));
		System.out.println(dayAttdData.get("attdTypeName"));
		System.out.println(dayAttdData.get("time"));

		map = new ModelMap();
		try {
		dayAttd.setEmpCode(dayAttdData.get("empCode"));
		dayAttd.setApplyDay(dayAttdData.get("applyDay"));
		dayAttd.setAttdTypeCode(dayAttdData.get("attdType"));
		dayAttd.setAttdTypeName(dayAttdData.get("attdTypeName"));
		dayAttd.setTime(dayAttdData.get("time"));
			System.out.println("근태등록요청 to");
			System.out.println(dayAttd);
			ResultTO resultTO = attdMgmtService.registDayAttd(dayAttd);
			System.out.println("리절트 티오");
			System.out.println(resultTO);
			map.put("errorMsg",resultTO.getErrorMsg());
			map.put("errorCode", resultTO.getErrorCode());

		}catch (Exception dae){
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}

		return map;
	}

	@DeleteMapping("daily-attnd")
	public ModelMap removeDayAttdList(HttpServletRequest request, HttpServletResponse response){
		
		map = new ModelMap();
		String sendData = request.getParameter("sendData");
				response.setContentType("application/json; charset=UTF-8");

		try {
			Gson gson = new Gson();
			ArrayList<DayAttdTO> dayAttdList = gson.fromJson(sendData, new TypeToken<ArrayList<DayAttdTO>>(){}.getType());
			attdMgmtService.removeDayAttdList(dayAttdList);
			map.put("errorMsg","success");
			map.put("errorCode", 0);

		}catch (Exception dae){
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}
	
	
	public ModelMap insertDayAttd(HttpServletRequest request, HttpServletResponse response){ 
		
		map = new ModelMap();
		String sendData = request.getParameter("sendData");
		response.setContentType("application/json; charset=UTF-8");

		try {		
			Gson gson = new Gson();
			DayAttdTO dayAttd = gson.fromJson(sendData, new TypeToken<DayAttdTO>(){}.getType());
			attdMgmtService.insertDayAttd(dayAttd);
			map.put("errorMsg","success");
			map.put("errorCode", 0);
			
		}catch (Exception dae){
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}
}
