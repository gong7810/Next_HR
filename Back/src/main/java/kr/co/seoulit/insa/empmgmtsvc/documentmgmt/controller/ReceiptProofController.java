package kr.co.seoulit.insa.empmgmtsvc.documentmgmt.controller;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import kr.co.seoulit.insa.empmgmtsvc.documentmgmt.service.DocumentMgmtService;
import kr.co.seoulit.insa.empmgmtsvc.documentmgmt.to.proofTO;


@RequestMapping("/documentmgmt/*")
@RestController
public class ReceiptProofController {
	
	@Autowired
	private DocumentMgmtService documentMgmtService;
	
	ModelMap map = null;
	
	@PostMapping("/receipt-proof")
	public ModelMap proofRequest(HttpServletRequest request, HttpServletResponse response) {
		
		map = new ModelMap();
		String sendData = request.getParameter("sendData");

		try {
			Gson gson = new Gson();
			proofTO proof = gson.fromJson(sendData, proofTO.class);
			documentMgmtService.proofRequest(proof);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);

		} catch (Exception dae) {
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());

		}
		return map;
	}

	
	@GetMapping("/receipt-proof")
	public ModelMap proofLookupList(@RequestParam("empCode") String empCode, @RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate, @RequestParam("Code") String Code,
			HttpServletResponse response) {
		
		map = new ModelMap();
		try {

			ArrayList<proofTO> proofList = documentMgmtService.proofLookupList(empCode,Code,startDate, endDate);
			map.put("proofList", proofList);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);

		} catch (Exception dae) {
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());

		}
		return map;
	}
	
	
	@DeleteMapping("/receipt-proof")
	public ModelMap removeProofAttdList(HttpServletRequest request, HttpServletResponse response) {		
		map = new ModelMap();
		String sendData=request.getParameter("sendData");
		
		try {
			
			Gson gson=new Gson();
			ArrayList<proofTO> proofList=gson.fromJson(sendData, new TypeToken<ArrayList<proofTO>>() {
			}.getType());
			documentMgmtService.removeProofRequest(proofList);
			map.put("errorMsg", "success");
			map.put("errorCode", 0);
			
		}catch(Exception dae) {
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}
	
}
