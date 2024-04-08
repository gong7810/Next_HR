package kr.co.seoulit.insa.salarysvc.salaryinfomgmt.controller;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.entity.FullTimeSalaryEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.service.SalaryInfoMgmtService;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.FullTimeSalTO;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.PayDayTO;

@RequestMapping("/hr/salaryinfomgmt/*")
@RestController
@CrossOrigin
public class FullTimeSalaryController
{

	@Autowired
	private SalaryInfoMgmtService salaryInfoMgmtService;
	ModelMap map = null;

	@GetMapping("salary")
	public ModelMap AllMoneyList(@RequestParam("applyYearMonth") String applyYearMonth, HttpServletResponse response)
	{
		map = new ModelMap();
		try
		{
			System.out.println("찎혀요1="+applyYearMonth);
			ArrayList<FullTimeSalTO> AllMoneyList = salaryInfoMgmtService.findAllMoney(applyYearMonth);
			map.put("AllMoneyList", AllMoneyList);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);

		} catch (Exception dae)
		{
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}

	@GetMapping("/salary/empcode")
	public ModelMap selectSalary(@RequestParam("empName") String empCode, HttpServletRequest request, HttpServletResponse response)
	{

		map = new ModelMap();
		try
		{
			System.out.println("컨트롤러"+empCode);
			List<FullTimeSalaryEntity> fullTimeSalaryList = salaryInfoMgmtService.findselectSalary(empCode);
			System.out.println("!!!!!!!!!!!!!!"+fullTimeSalaryList);
			map.put("fullTimeSalaryList", fullTimeSalaryList);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);
			System.out.println("!!!!!!!!!!!!!!"+map);

		} catch (Exception dae)
		{
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}

		return map;
	}

	@GetMapping("/salary/list")
	public ModelMap selectSalary(HttpServletRequest request, HttpServletResponse response)
	{
		map = new ModelMap();
		try
		{
//
			System.out.println("리스트 컨트롤러===="+  request );
			ArrayList<FullTimeSalTO> fullTimeSalaryList = salaryInfoMgmtService.findSalary();
			map.put("FullTimeSalaryList", fullTimeSalaryList);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);

		} catch (Exception dae)
		{
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		System.out.println("리스트 컨트롤러 반환====" + map );
		return map;
	}

	@PutMapping("salary")
	public ModelMap modifyFullTimeSalary(HttpServletRequest request, HttpServletResponse response)
	{
		String sendData = request.getParameter("sendData");
		map = new ModelMap();
		try
		{
			ObjectMapper mapper = new ObjectMapper();
			ArrayList<FullTimeSalTO> fullTimeSalary = mapper.readValue(sendData,new TypeReference<ArrayList<FullTimeSalTO>>(){});
			System.out.println("자바체크" + fullTimeSalary);
			salaryInfoMgmtService.modifyFullTimeSalary(fullTimeSalary);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);

		} catch (Exception e)
		{
			map.put("errorMsg", e.getMessage());
			map.put("errorCode", -1);
		}
		return map;
	}

	public ModelMap paydayList(HttpServletRequest request, HttpServletResponse response)
	{

		map = new ModelMap();
		try
		{
			ArrayList<PayDayTO> list = salaryInfoMgmtService.findPayDayList();
			map.put("list", list);

		} catch (Exception e)
		{
			map.put("errorCode", -1);
			map.put("errorMsg", e.getMessage());
		}
		return map;
	}

}