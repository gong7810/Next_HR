package kr.co.seoulit.insa.commsvc.foudinfomgmt.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.seoulit.insa.commsvc.foudinfomgmt.service.FoudInfoMgmtService;
import kr.co.seoulit.insa.commsvc.foudinfomgmt.to.HolidayTO;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/hr/foudinfomgmt/*")///foudinfomgmt/holiday
@RestController
@CrossOrigin
public class HolidayListController {
	
	@Autowired
	private FoudInfoMgmtService foudInfoMgmtService;	
	ModelMap map = null;

	@GetMapping("holiday")
	public ModelMap findHolidayList(HttpServletRequest request, HttpServletResponse response) {

		map = new ModelMap();
		response.setContentType("application/json; charset=UTF-8");
		try {
			ArrayList<HolidayTO> holidayList = foudInfoMgmtService.findHolidayList();
			HolidayTO holito = new HolidayTO();
			map.put("holidayList", holidayList);
			map.put("emptyHoilday", holito);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);
			
		} catch (Exception dae) {
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}

	@GetMapping("holidayweek")
	public ModelMap findWeekDayCount(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate,
			HttpServletResponse response) {
		map = new ModelMap();
		response.setContentType("application/json; charset=UTF-8");		
		try {
			String weekdayCount = foudInfoMgmtService.findWeekDayCount(startDate, endDate);
			map.put("weekdayCount", weekdayCount);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);
			
		} catch (Exception dae) {
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}


	@PostMapping("holiday")
	public ModelMap batchHolidayProcess(@RequestBody ArrayList<HolidayTO> holidayList) {
		ModelMap map = new ModelMap();
		System.out.println(holidayList);

		try {
			// holidayList 매개변수를 통해 요청 본문의 데이터가 이미 파싱되었습니다.
			// 따라서 이후 ObjectMapper를 사용하여 다시 파싱할 필요가 없습니다.

			// holidayList를 사용하여 데이터 처리
			HolidayTO sendData = holidayList.get(0);
			System.out.println(holidayList);
			sendData.getStatus();
			System.out.println("getStatus"+sendData.getStatus());
			System.out.println("senData: " + sendData);

			foudInfoMgmtService.batchHolidayProcess(holidayList);

//			foudInfoMgmtService.batchHolidayProcess(holidayList);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);

		} catch (Exception e) {
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", e.getMessage());
		}
		return map;
	}

	//	@PostMapping("holiday")
//	public ModelMap batchHolidayProcess(HttpServletRequest request, HttpServletResponse response) {
//		map = new ModelMap();
//		String sendData = request.getParameter("sendData");
//		System.out.println("senData"+sendData);
//		try {
//
//			ObjectMapper mapper = new ObjectMapper();
//			ArrayList<HolidayTO> holidayList = mapper.readValue(sendData, new TypeReference<ArrayList<HolidayTO>>() {});
//
//			foudInfoMgmtService.batchHolidayProcess(holidayList);
//			map.put("errorMsg", "success");
//			map.put("errorCode", 0);
//
//		} catch (Exception e) {
//			map.clear();
//			map.put("errorCode", -1);
//			map.put("errorMsg", e.getMessage());
//		}
//		return map;
//	}
}
