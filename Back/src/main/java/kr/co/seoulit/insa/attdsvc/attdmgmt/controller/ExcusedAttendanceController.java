package kr.co.seoulit.insa.attdsvc.attdmgmt.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.seoulit.insa.attdsvc.attdappvl.to.MonthAttdMgtTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import kr.co.seoulit.insa.attdsvc.attdmgmt.service.AttdMgmtService;
import kr.co.seoulit.insa.attdsvc.attdmgmt.to.RestAttdTO;

@RestController
@CrossOrigin
@RequestMapping("/attdmgmt/*")
public class ExcusedAttendanceController {
	
	@Autowired
	private AttdMgmtService attdMgmtService;	
	ModelMap map = null;

	@RequestMapping(value ="/excused-attnd" , method = {RequestMethod.POST, RequestMethod.GET})
	public ModelMap modifyEmpEvalList(@RequestParam(value ="empCode", required = false)String empCode
			,@RequestParam(value ="restTypeCode", required = false) String restTypeCode
			,@RequestParam(value ="restTypeName", required = false) String restTypeName
			,@RequestParam(value ="requestDate", required = false) String requestDate
			,@RequestParam(value ="startDate", required = false) String startDate
			,@RequestParam(value ="endDate", required = false) String endDate
			,@RequestParam(value ="numberOfDays", required = false) String numberOfDays
			,@RequestParam(value ="cause", required = false) String cause
			,@RequestParam(value ="applovalStatus", required = false) String applovalStatus
			,@RequestParam(value ="startTime", required = false) String startTime
			,@RequestParam(value ="endTime", required = false) String endTime
	) {

		System.out.println("check");
		System.out.println(requestDate);

		java.sql.Date transRqDate = java.sql.Date.valueOf(requestDate);
		java.sql.Date transStartDate = java.sql.Date.valueOf(startDate);
		java.sql.Date transEndDate = java.sql.Date.valueOf(endDate);

		map = new ModelMap();
		map.put("empCode", empCode);
		map.put("restTypeCode", restTypeCode);
		map.put("restTypeName",restTypeName);
		map.put("requestDate",transRqDate);
		map.put("startDate", transStartDate);
		map.put("endDate", transEndDate);
		map.put("numberOfDays", Double.parseDouble(numberOfDays));
		map.put("cause", cause);
		map.put("applovalStatus", applovalStatus);
		map.put("startTime", Integer.parseInt(startTime));
		map.put("endTime", Integer.parseInt(endTime));

		try {

			attdMgmtService.registRestAttd(map);
			map.put("errorMsg","success");
			map.put("errorCode", 0);


		} catch (Exception dae) {
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());

		}
		return map;
	}
//	@PostMapping("/excused-attnd")
//	public ModelMap registRestAttd(HttpServletRequest request, HttpServletResponse response) {
//		map = new ModelMap();
//
//		String sendData = request.getParameter("sendData");
//		System.out.println(sendData);
//		try {
//			Gson gson = new Gson();
//			RestAttdTO restAttd = gson.fromJson(sendData, RestAttdTO.class);
//			System.out.println(restAttd);
//			attdMgmtService.registRestAttd(restAttd);
//			map.put("errorMsg", "success");
//			map.put("errorCode", 0);
//
//		} catch (Exception dae) {
//			map.clear();
//			map.put("errorCode", -1);
//			map.put("errorMsg", dae.getMessage());
//		}
//		return map;
//	}
//	@CrossOrigin
//	@PostMapping("react-excused-attnd")
//	public ModelMap registRestAttd2(@RequestBody HashMap<String, RestAttdTO> restAttdList) {
////	public ModelMap registRestAttd2(@RequestBody RestAttdTO monthAttdMgt) {
//
//		map = new ModelMap();
//		System.out.println("근태외 요청 도착");
//		System.out.println("출장신청 요청 도착");
//		System.out.println(restAttdList);
//		System.out.println(restAttdList.get("sendData"));
//
//		try {
//			RestAttdTO restAttd = restAttdList.get("sendData");
//			attdMgmtService.registRestAttd(restAttd);
//			map.put("errorMsg", "success");
//			map.put("errorCode", 0);
//
//		} catch (Exception dae) {
//			map.clear();
//			map.put("errorCode", -1);
//			map.put("errorMsg", dae.getMessage());
//		}
//		return map;
//	}
	
	@GetMapping("/excused-attnd")
	public ModelMap findRestAttdList(@RequestParam("empCode") String empCode, @RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate, @RequestParam("code") String code, HttpServletResponse response) {
		 
		map = new ModelMap();		
		response.setContentType("application/json; charset=UTF-8");
		System.out.println(empCode);
		System.out.println(startDate);
		System.out.println(endDate);
		System.out.println(code);

		try {
			ArrayList<RestAttdTO> restAttdList = attdMgmtService.findRestAttdList(empCode, startDate, endDate, code);
			map.put("restAttdList", restAttdList);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);
			
		}catch (Exception dae) {
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}

	@DeleteMapping("/excused-attnd")
	public ModelMap removeRestAttdList(HttpServletRequest request, HttpServletResponse response) {

		map = new ModelMap();
		String sendData = request.getParameter("sendData");
		response.setContentType("application/json; charset=UTF-8");
		try {
			Gson gson = new Gson();
			ArrayList<RestAttdTO> restAttdList = gson.fromJson(sendData, new TypeToken<ArrayList<RestAttdTO>>() {
			}.getType());
			attdMgmtService.removeRestAttdList(restAttdList);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);

		} catch (Exception dae) {
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}

}
