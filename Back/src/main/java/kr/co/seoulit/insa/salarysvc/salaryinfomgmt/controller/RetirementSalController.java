package kr.co.seoulit.insa.salarysvc.salaryinfomgmt.controller;

import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.service.SalaryInfoMgmtService;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.RetirementSalaryTO;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.RegistRetirementTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;

@RequestMapping("hr/salaryinfomgmt/*")
@RestController
@CrossOrigin
public class RetirementSalController {

	@Autowired
	private SalaryInfoMgmtService salaryInfoMgmtService;
	ModelMap map = null;

	//퇴직금 조회
	@GetMapping("retirement")
	public ModelMap retirementSalaryList(@RequestParam("empCode") String empCode, HttpServletResponse response) {

		map = new ModelMap();
		try {

			ArrayList<RetirementSalaryTO> retirementSalaryList = salaryInfoMgmtService
					.findretirementSalaryList(empCode);
			map.put("retirementSalaryList", retirementSalaryList);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);

		} catch (Exception dae) {
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}

	//퇴직금 등록
	@PostMapping("/retirement")
	public HashMap<String, Object> registRetirementPay(@RequestBody RegistRetirementTO registRetirementTO) {

		HashMap<String, Object> map = new HashMap<>();
		try {
			salaryInfoMgmtService.registRetirementPay(registRetirementTO);
			map.put("errorCode", "등록 성공");
		} catch (Exception ioe) {
			map.put("errorCode", "failed");
			map.put("errorMsg", ioe.getMessage());
		}
		System.out.println("map확인");
		System.out.println(map);
		return map;
	}
}