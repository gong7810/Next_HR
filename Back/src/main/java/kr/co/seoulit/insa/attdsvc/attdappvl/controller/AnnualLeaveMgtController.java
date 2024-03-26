package kr.co.seoulit.insa.attdsvc.attdappvl.controller;

import java.util.ArrayList;
import java.util.HashMap;

import kr.co.seoulit.insa.attdsvc.attdmgmt.to.RestAttdTO;
import org.springframework.ui.ModelMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import kr.co.seoulit.insa.attdsvc.attdappvl.service.AttdAppvlService;
import kr.co.seoulit.insa.attdsvc.attdappvl.to.AnnualLeaveMgtTO;

@CrossOrigin
@RestController
@RequestMapping("/attdappvl/*")
public class AnnualLeaveMgtController {
	
   @Autowired
   private AttdAppvlService attdAppvlService;
   ModelMap map = null;
   
   @GetMapping("/annual-leaveMgt")
   public ModelMap findAnnualVacationMgtList(@RequestParam("applyYearMonth") String applyYearMonth, HttpServletResponse response){
       System.out.println("연차신청 조회 도착");
       System.out.println(applyYearMonth);

	  map = new ModelMap();
      response.setContentType("application/json; charset=UTF-8");
      try {
         
         ArrayList<AnnualLeaveMgtTO> annualVacationMgtList = attdAppvlService.findAnnualVacationMgtList(applyYearMonth);
         
         map.put("annualVacationMgtList", annualVacationMgtList);
         map.put("errorMsg","success");
         map.put("errorCode", 0);
         
      } catch (Exception dae){
    	  map.clear();
    	  map.put("errorCode", -1);
    	  map.put("errorMsg", dae.getMessage());
      }
      return map;
   }
   
   
   @PutMapping("/annual-leaveMgt/1")
   public ModelMap modifyAnnualVacationMgtList(HttpServletRequest request, HttpServletResponse response){
	   map = new ModelMap();
      String sendData = request.getParameter("sendData");
      response.setContentType("application/json; charset=UTF-8");
      try {

         Gson gson = new Gson();
         ArrayList<AnnualLeaveMgtTO> annualVacationMgtList = gson.fromJson(sendData, new TypeToken<ArrayList<AnnualLeaveMgtTO>>(){}.getType());
         attdAppvlService.modifyAnnualVacationMgtList(annualVacationMgtList);
         map.put("errorMsg","success");
         map.put("errorCode", 0);
         
      }catch (Exception dae){
    	  map.clear();
    	  map.put("errorCode", -1);
    	  map.put("errorMsg", dae.getMessage());
      }
      return map;
   }
    @PutMapping("/react-annual-leaveMgt/1")
    public ModelMap modifyAnnualVacationMgtList2(@RequestBody HashMap<String, ArrayList<AnnualLeaveMgtTO>> request, HttpServletResponse response){
        map = new ModelMap();
        System.out.println(request.get("sendData"));

        response.setContentType("application/json; charset=UTF-8");
        try {
//
//            Gson gson = new Gson();
            ArrayList<AnnualLeaveMgtTO> annualVacationMgtList = request.get("sendData");
            System.out.println("annualVacationMgtList");
            System.out.println(annualVacationMgtList);
            attdAppvlService.modifyAnnualVacationMgtList(annualVacationMgtList);
            map.put("errorMsg","success");
            map.put("errorCode", 0);

        }catch (Exception dae){
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", dae.getMessage());
        }
        return map;
    }

    @PutMapping("/annual-leaveMgt/2")
   public ModelMap cancelAnnualVacationMgtList(HttpServletRequest request, HttpServletResponse response){
	   map = new ModelMap();
      String sendData = request.getParameter("sendData");
      response.setContentType("application/json; charset=UTF-8");
      try {
         Gson gson = new Gson();
         ArrayList<AnnualLeaveMgtTO> annualVacationMgtList = gson.fromJson(sendData, new TypeToken<ArrayList<AnnualLeaveMgtTO>>(){}.getType());
         attdAppvlService.cancelAnnualVacationMgtList(annualVacationMgtList);
         map.put("errorMsg","success");
         map.put("errorCode", 0);

      }catch (Exception dae){
    	  map.clear();
    	  map.put("errorCode", -1);
    	  map.put("errorMsg", dae.getMessage());
      }
      return map;
   } 
   
   
}