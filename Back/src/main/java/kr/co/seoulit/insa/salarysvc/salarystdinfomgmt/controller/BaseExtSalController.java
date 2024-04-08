package kr.co.seoulit.insa.salarysvc.salarystdinfomgmt.controller;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import kr.co.seoulit.insa.salarysvc.salarystdinfomgmt.service.SalaryStdInfoMgmtService;
import kr.co.seoulit.insa.salarysvc.salarystdinfomgmt.to.BaseExtSalTO;

@RequestMapping("/hr/salarystdinfomgmt/*")
@RestController
@CrossOrigin
public class BaseExtSalController
{

	@Autowired
	private SalaryStdInfoMgmtService salaryStdInfoMgmtService;
	ModelMap map = null;

	@GetMapping("over-sal")
	public ModelMap findBaseExtSalList(HttpServletRequest request, HttpServletResponse response)
	{

		map = new ModelMap();
		try
		{
			ArrayList<BaseExtSalTO> baseExtSalList = salaryStdInfoMgmtService.findBaseExtSalList();
			map.put("baseExtSalList", baseExtSalList);
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

	@PutMapping("over-sal")
	public ModelMap modifyBaseExtSalList(HttpServletRequest request, HttpServletResponse response)
	{
		map = new ModelMap();
		String sendData = request.getParameter("sendData");
		try
		{
			Gson gson = new Gson();
			ArrayList<BaseExtSalTO> baseExtSalList = gson.fromJson(sendData, new TypeToken<ArrayList<BaseExtSalTO>>(){}.getType());
			salaryStdInfoMgmtService.modifyBaseExtSalList(baseExtSalList);
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
