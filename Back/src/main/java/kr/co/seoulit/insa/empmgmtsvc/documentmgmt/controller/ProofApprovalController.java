package kr.co.seoulit.insa.empmgmtsvc.documentmgmt.controller;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import kr.co.seoulit.insa.empmgmtsvc.documentmgmt.service.DocumentMgmtService;
import kr.co.seoulit.insa.empmgmtsvc.documentmgmt.to.proofTO;


@RequestMapping("/documentmgmt/*")
@RestController
public class ProofApprovalController {
	
	@Autowired
	private DocumentMgmtService documentMgmtService;	
	ModelMap map = null;
	
	@GetMapping("proof-approval")
	public ModelMap findProofAttdListByDept(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate,
			@RequestParam("deptName") String deptName, HttpServletResponse response){
		
		map = new ModelMap();
		try {

			ArrayList<proofTO> proofAttdList = documentMgmtService.findProofListByDept(deptName, startDate, endDate);
			map.put("errorMsg","success");
			map.put("errorCode", 0);
			map.put("proofAttdList", proofAttdList);

		} catch (Exception dae){
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}
	
	
	@PutMapping("proof-approval")
	public ModelMap modifyProofList(HttpServletRequest request, HttpServletResponse response) {
		
		map = new ModelMap();
		String sendData = request.getParameter("sendData");
		
		try {
			Gson gson = new Gson();
			ArrayList<proofTO> proofList = gson.fromJson(sendData, new TypeToken<ArrayList<proofTO>>(){}.getType());
			System.out.println(proofList);
			documentMgmtService.modifyProofList(proofList);
			map.put("errorMsg","success");
			map.put("errorCode", 0);

		} catch (Exception dae) {
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}
}
