package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.entity.EmpDetailEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.service.EmpInfoService;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpTO;


@RequestMapping("/hr/empinfomgmt/*")
@RestController
@CrossOrigin("*")
public class EmpListController {

	@Autowired
	private EmpInfoService empInfoService;

	ModelMap map = null;

	// 사원 정보를 부서코드에 따라서 본인직급 미만만 조회
	@GetMapping("/emplist")
	public Map<String,Object> emplist(@RequestParam(value="value",required = true,defaultValue = "000000") String val,
									  @RequestParam("authLevel") String authLevel) {

	Map<String,Object> map = new HashMap<>();

		try {
			System.out.println("성민=" + val);
			String value = "000000";
			if (val != null) {
				value = val;
			}
			List<EmpDetailEntity> list = empInfoService.findEmpList(value, authLevel);
			map.put("errorCode",0);
			map.put("errorMsg","succeed");
			map.put("list", list);
			System.out.println("<<<<<<<<<<<<<<<<<list:"+list);
		} catch (Exception e) {
			map.put("errorCode", -1);
			map.put("errorMsg", "failed");
			map.put("list",null);
		}
		return map;
	}

	// 사원 정보를 부서코드에 따라서 전체 조회
	@GetMapping("/empAllList")
	public Map<String,Object> empAllList(@RequestParam(value="value",required = true,defaultValue = "000000") String val) {

		Map<String,Object> map = new HashMap<>();

		try {
			System.out.println("부서번호=" + val);
			String value = "000000";
			if (val != null) {
				value = val;
			}
			List<EmpDetailEntity> list = empInfoService.findEmpAllList(value);
			map.put("errorCode",0);
			map.put("errorMsg","succeed");
			map.put("list", list);
			System.out.println("<<<<<<<<<<<<<<<<<list:"+list);
		} catch (Exception e) {
			map.put("errorCode", -1);
			map.put("errorMsg", "failed");
			map.put("list",null);
		}
		return map;
	}

	@GetMapping("/empreallist")
	public ModelMap emplist(HttpServletRequest request, HttpServletResponse response) {

		map = new ModelMap();
		try {

			ArrayList<EmpTO> list = empInfoService.findEmprealList();
			map.put("list", list);
			System.out.println("<<<<<<<<<<<<<<<<<<<< list = " + list);
		} catch (Exception e) {
			map.put("errorCode", -1);
			map.put("errorMsg", e.getMessage());
		}
		return map;
	}
}