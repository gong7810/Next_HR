package kr.co.seoulit.insa.attdsvc.attdappvl.controller;

import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.seoulit.insa.attdsvc.attdappvl.to.MonthAttdMgtTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import kr.co.seoulit.insa.attdsvc.attdappvl.service.AttdAppvlService;
import kr.co.seoulit.insa.attdsvc.attdmgmt.to.RestAttdTO;

@CrossOrigin
@RestController
@RequestMapping("/attdappvl/*")
public class AttendanceApprovalController {
	
	@Autowired
	private AttdAppvlService attdAppvlService;
	ModelMap map = null;
	
	@GetMapping("attnd-approval")
	public ModelMap findRestAttdListByDept(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate,
			@RequestParam("deptCode") String deptCode, HttpServletResponse response){
		System.out.println("근태외 조회 도착");
		System.out.println(startDate);
		System.out.println(endDate);
		System.out.println(deptCode);

		map = new ModelMap();
		response.setContentType("application/json; charset=UTF-8");

		try {
			ArrayList<RestAttdTO> restAttdList = attdAppvlService.findRestAttdListByDept(deptCode, startDate, endDate);
			map.put("errorMsg","success");
			map.put("errorCode", 0);
			map.put("restAttdList", restAttdList);
			
		} catch (Exception dae){
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}
	
	//확정버튼 클릭시 요청
	@PutMapping("react-attnd-approval")
	public ModelMap modifyRestAttdList2(@RequestBody HashMap<String, ArrayList<RestAttdTO>> request, HttpServletResponse response){
		System.out.println("근태외 확정 버튼 클릭시 요청");
		System.out.println(request.get("sendData"));

		map = new ModelMap();
		response.setContentType("application/json; charset=UTF-8");

		try {
			ArrayList<RestAttdTO> restAttdList = request.get("sendData");
			System.out.println("restAttdList");
			System.out.println(restAttdList);
			attdAppvlService.modifyRestAttdList(restAttdList);
			map.put("errorMsg","success");
			map.put("errorCode", 0);

		} catch (Exception dae){
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map; 
	}

	@PutMapping("attnd-approval")
	public ModelMap modifyRestAttdList(HttpServletRequest request, HttpServletResponse response){
		System.out.println("근태외 확정 버튼 클릭시 요청");
		System.out.println("근태외 확정 버튼 클릭시 요청");

		map = new ModelMap();
		String sendData = request.getParameter("sendData");
		response.setContentType("application/json; charset=UTF-8");

		try {
			Gson gson = new Gson();
			ArrayList<RestAttdTO> restAttdList = gson.fromJson(sendData, new TypeToken<ArrayList<RestAttdTO>>(){}.getType());
			attdAppvlService.modifyRestAttdList(restAttdList);
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
