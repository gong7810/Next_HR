package kr.co.seoulit.insa.attdsvc.attdappvl.controller;


import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import kr.co.seoulit.insa.attdsvc.attdappvl.service.AttdAppvlService;
import kr.co.seoulit.insa.attdsvc.attdappvl.to.DayAttdMgtTO;

@RestController
@RequestMapping("/attdappvl/*")
@CrossOrigin
public class DailyAttendanceMgtController {
	
	@Autowired
	private AttdAppvlService attdAppvlService;
	ModelMap map = null;
	
	@GetMapping("day-attnd")
	public ModelMap findDayAttdMgtList(@RequestParam("applyDay") String applyDay, HttpServletResponse response){
		
		map = new ModelMap();
		response.setContentType("application/json; charset=UTF-8"); // 서버가 보낼 타입을 json 으로 지정함 

		try {
			ArrayList<DayAttdMgtTO> dayAttdMgtList = attdAppvlService.findDayAttdMgtList(applyDay);
			map.put("DayAttdTO", dayAttdMgtList);
			map.put("errorMsg","success");
			map.put("errorCode", 0);
			
		} catch (Exception dae){
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		System.out.println("요청이 왔어? "+map);
		return map;
	}

	@PutMapping("day-attnd")
	public ModelMap modifyDayAttdList(HttpServletRequest request, HttpServletResponse response){
		
		map = new ModelMap();
		String sendData = request.getParameter("sendData");
		response.setContentType("application/json; charset=UTF-8");

		try {	
			Gson gson = new Gson();
			ArrayList<DayAttdMgtTO> dayAttdMgtList = gson.fromJson(sendData, new TypeToken<ArrayList<DayAttdMgtTO>>(){}.getType());
			attdAppvlService.modifyDayAttdMgtList(dayAttdMgtList);
			map.put("errorMsg","success");
			map.put("errorCode", 0);

		} catch (Exception dae){
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}	

}
