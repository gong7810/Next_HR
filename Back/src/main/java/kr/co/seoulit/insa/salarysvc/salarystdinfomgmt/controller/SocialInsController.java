package kr.co.seoulit.insa.salarysvc.salarystdinfomgmt.controller;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import kr.co.seoulit.insa.salarysvc.salarystdinfomgmt.service.SalaryStdInfoMgmtService;
import kr.co.seoulit.insa.salarysvc.salarystdinfomgmt.to.SocialInsTO;



@RequestMapping("/hr/salarystdinfomgmt/*")
@RestController
@CrossOrigin
public class SocialInsController {

	@Autowired
	private SalaryStdInfoMgmtService salaryStdInfoMgmtService;
	ModelMap map = null;

	@GetMapping("social")
	public ModelMap findBaseInsureList(@RequestParam("searchYear") String yearBox, HttpServletResponse response){

		map = new ModelMap();
		try {
			System.out.println("찎혀요?"+yearBox);
			ArrayList<SocialInsTO> baseInsureList = salaryStdInfoMgmtService.findBaseInsureList(yearBox);
			SocialInsTO emptyBean = new SocialInsTO();

			map.put("baseInsureList", baseInsureList);
			emptyBean.setStatus("insert");
			map.put("emptyBean", emptyBean);
			map.put("errorMsg","success");
			map.put("errorCode", 0);

		} catch (Exception dae){
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}


	@PutMapping("social")
	public ModelMap updateInsureData(HttpServletRequest request, HttpServletResponse response){


		String sendData = request.getParameter("sendData");
		map = new ModelMap();
		try {
			Gson gson = new Gson();
			ArrayList<SocialInsTO> baseInsureList = gson.fromJson(sendData, new TypeToken<ArrayList<SocialInsTO>>(){}.getType());
			salaryStdInfoMgmtService.updateInsureData(baseInsureList);
			map.put("errorMsg","success");
			map.put("errorCode", 0);

		} catch (DataAccessException dae){
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}


	@DeleteMapping("social")
	public ModelMap deleteInsureData(HttpServletRequest request, HttpServletResponse response){

		String sendData = request.getParameter("sendData");
		map = new ModelMap();
		try {
			Gson gson = new Gson();
			ArrayList<SocialInsTO> baseInsureList = gson.fromJson(sendData, new TypeToken<ArrayList<SocialInsTO>>(){}.getType());
			salaryStdInfoMgmtService.deleteInsureData(baseInsureList);
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