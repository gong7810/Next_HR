package kr.co.seoulit.insa.salarysvc.salaryinfomgmt.controller;

import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.service.SalaryInfoMgmtService;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.RetirementSalaryTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

@RequestMapping("/hr/salaryinfomgmt/*")
@RestController
@CrossOrigin
public class RetirementSalController
{

	@Autowired
	private SalaryInfoMgmtService salaryInfoMgmtService;
	ModelMap map = null;

	@GetMapping("retirement")
	public ModelMap retirementSalaryList(@RequestParam("empCode") String empCode, HttpServletResponse response)
	{

		map = new ModelMap();
		try
		{

			ArrayList<RetirementSalaryTO> retirementSalaryList = salaryInfoMgmtService
					.findretirementSalaryList(empCode);
			map.put("retirementSalaryList", retirementSalaryList);
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
}
