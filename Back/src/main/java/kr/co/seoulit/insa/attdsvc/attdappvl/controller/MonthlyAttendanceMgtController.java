package kr.co.seoulit.insa.attdsvc.attdappvl.controller;

import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import kr.co.seoulit.insa.attdsvc.attdappvl.service.AttdAppvlService;
import kr.co.seoulit.insa.attdsvc.attdappvl.to.MonthAttdMgtTO;

@RestController
@CrossOrigin
@RequestMapping("/attdappvl/*")
public class MonthlyAttendanceMgtController {
	
	@Autowired
	private AttdAppvlService attdAppvlService;


	@CrossOrigin
	@GetMapping("")
	public ModelMap findMonthAttdMgtList(@RequestParam("applyYearMonth") String applyYearMonth, HttpServletResponse response){

		ModelMap map = new ModelMap();
		response.setContentType("application/json; charset=UTF-8");
		System.out.println("월근태 조회 요청 도착");
		System.out.println(applyYearMonth);
		try {
			ArrayList<MonthAttdMgtTO> monthAttdMgtList = attdAppvlService.findMonthAttdMgtList(applyYearMonth);
			map.put("monthAttdMgtList", monthAttdMgtList);
			map.put("errorMsg","success");
			map.put("errorCode", 0);
			
		}catch (Exception dae){
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}

	@CrossOrigin
	@PutMapping("month-attnd")
	public ModelMap modifyMonthAttdList(@RequestParam("applyYearMonth") String applyYearMonth, HttpServletResponse response){
		System.out.println("먼스 어텐드 ");
		System.out.println(applyYearMonth);

		ModelMap map = new ModelMap();
		String sendData = applyYearMonth;
		response.setContentType("application/json; charset=UTF-8");
		try {
			Gson gson = new Gson();
			ArrayList<MonthAttdMgtTO> monthAttdMgtList = gson.fromJson(sendData, new TypeToken<ArrayList<MonthAttdMgtTO>>(){}.getType());
			attdAppvlService.modifyMonthAttdMgtList(monthAttdMgtList);
			map.put("errorMsg","success");
			map.put("errorCode", 0);
			
		}catch (Exception dae){
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}

	@CrossOrigin
	@RequestMapping(value = "month-attnd", method = RequestMethod.POST) // 월 마감 함수
	public ModelMap reactModifyMonthAttdList(@RequestBody HashMap<String, ArrayList<MonthAttdMgtTO>> monthAttdMgt) {

		ModelMap map = new ModelMap();
		try {
			System.out.println("QWEQWEQWEWQEQWEWQEWQ" + monthAttdMgt);
			System.out.println(monthAttdMgt.get("monthAttdMgt"));
			ArrayList<MonthAttdMgtTO> monthAttdMgtList = monthAttdMgt.get("monthAttdMgt");
//			Gson gson = new Gson();
//			ArrayList<MonthAttdMgtTO> monthAttdMgtList = gson.fromJson(sendData, new TypeToken<ArrayList<MonthAttdMgtTO>>(){}.getType());
//			attdServiceFacade.modifyMonthAttdMgtList(monthAttdMgtList);
			attdAppvlService.modifyMonthAttdMgtList(monthAttdMgtList);
			map.put("errorMsg","success");
			map.put("errorCode", 0);
		} catch (Exception ioe) {
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", ioe.getMessage());
		}

		System.out.println("리턴 맵");
		System.out.println(map);
		return map;
	}

}
