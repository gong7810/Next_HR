package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import com.google.gson.Gson;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.service.EmpInfoService;
import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to.EmpEvalTO;


@RequestMapping("/empinfomgmt/*")
@RestController
@CrossOrigin
public class EmpEvalController {

	@Autowired
	private EmpInfoService empInfoService;

	ModelMap map = null;

	// 아직 사원평가가 진행되지 않았거나, 사원평가가 반려된 직원들의 정보를 반환
	// 예외가 발생하면은 빈 배열을 반환
	// ---> 프론트 단에서 검색된 값이 없을때 빈배열을 사용할수 있다.
	// 사원 고과 평가 페이지에서 사용하는 쿼리문 입니다.(사원고과를 진행하지 않은 사원의 정보 및 사원고과 삭제 및 반려
	// 진행중인 사원들의 정보를 가져옵니다.)
	@GetMapping("/evaluation/list")
	public List<EmpEvalTO> validEmpEvalList(@RequestParam("authLevel") String authLevel) {
		List<EmpEvalTO> empList = new ArrayList<EmpEvalTO>();
		try {

			empList = empInfoService.findValidEmpEvalList(authLevel);
			System.out.println("<<<< empList = " + empList);
			return empList;
		} catch (Exception e) {
			e.printStackTrace();
			return empList;
		}


	}

	// 사원고과 관리 페이지에서
	@GetMapping("/evaluation/list/approvalStatus")
	public Map<String,Object> findEmpEvalByApprovalStatus() {

		List<EmpEvalTO> list = new ArrayList<>();
		Map<String, Object> map = new HashMap<>();
		try {
			list = empInfoService.findEmpEvalListByApprovalStatus();
			map.put("list",list);
			map.put("errorCode",0);
			return map;
		} catch (Exception e) {
			e.printStackTrace();
			map.clear();
			map.put("list",list);
			map.put("errorCode",-1);
		}
		System.out.println("map is "+map);
			return map;

	}



	@PostMapping("/evaluation/list/approvalStatus")
	public Map<String,Object> findEmpEvalByApprovalStatusCondition(@RequestBody EmpEvalTO empEvalTO) {
		System.out.println("approvalStatus = " + empEvalTO.getApprovalStatus());
		List<EmpEvalTO> list = new ArrayList<>();
		Map<String, Object> map = new HashMap<>();
		try {

			list = empInfoService.findEmpEvalByApprovalStatusCondition(empEvalTO.getApprovalStatus().trim());
			System.out.println("<<<<<<<<< list = " + list);
			map.put("list",list);
			map.put("errorCode",0);
			return map;

		} catch (Exception e) {
			e.printStackTrace();
			map.clear();

			map.put("list",list);
			map.put("errorCode",-1);
			return map;
		}

	}


	@GetMapping("/evaluation/list/all")
	public Map<String,Object> selectEmpEvalList(){

		List<EmpEvalTO> list = new ArrayList<>();
		Map<String,Object> map = new HashMap<>();
		try{

			list = empInfoService.findEmpEvalList();
			map.put("list",list);
			map.put("errorCode",0);
			return map;

		}catch(Exception e){
			e.printStackTrace();
			map.clear();
			map.put("list",list);
			map.put("errorCode",-1);
			return map;
		}

	}


	// 사원 평가 엔드 포인트가 여기인거 같다.
	// 정상 작동한다.
	@PostMapping("/evaluation")
	public Map<String,Object> registEmpEval(@RequestBody EmpEvalTO empEvalTO) {
			Map<String,Object> map = new HashMap<>();


		System.out.println("<<<<<<<<<< empEvalTO is : " + empEvalTO);
		System.out.println(">>>>>>>>>> empEvalTO.empCode is : " + empEvalTO.getEmpCode());
		try {

			if (empEvalTO.getEmpCode() == null || empEvalTO.getEmpName() == null)
				throw new Exception();

			empInfoService.registEmpEval(empEvalTO);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);

		} catch (Exception dae) {
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", "failed");
		}
		return map;
	}




	// 이거는 배열로 받아서 작업을 할수 있도록 한다.


	@DeleteMapping("/evaluation")
	public ModelMap removeEmpEvalList(@RequestBody List<EmpEvalTO> empEvalTO) {

		System.out.println("<<<<<<<<<<<<< deleted empEvalTO.size() = " + empEvalTO.size());
		System.out.println("<<<<<<<<<<<<< deleted empEvalTO = " + empEvalTO);

		try {

			empInfoService.removeEmpEvalList(empEvalTO);
			map.put("errorCode", 0);
			map.put("errorMsg", "success");

		} catch (Exception dae) {
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg","failed"); // failed 문자열이 안넘어 가는데 이유를 모르겠다.
		}
			System.out.println("map is "+map);
		return map;
	}

}
