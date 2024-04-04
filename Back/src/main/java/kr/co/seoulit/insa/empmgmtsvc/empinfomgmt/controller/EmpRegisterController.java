package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.service.EmpInfoService;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpTO;
import java.util.HashMap;
import java.util.Map;


@RequestMapping("/empinfomgmt/*")
@RestController
@CrossOrigin
public class EmpRegisterController {

	@Autowired
	private EmpInfoService empInfoService;

	@PostMapping("/employee")
	public Map<String, Object> registEmployee(@RequestBody EmpTO empTO) {
		System.out.println("<<<<<<<<<<< empTO = " + empTO);
		Map<String, Object> map = new HashMap<>();

		try {
			empInfoService.registEmployee(empTO);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);

		} catch (Exception e) {
			map.clear();
			map.put("errorMsg", e.getMessage());
			map.put("errorCode", -1);

		}
		return map;
	}


}
