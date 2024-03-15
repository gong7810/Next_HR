package kr.co.seoulit.insa.empmgmtsvc.pfmevl.controller;

import kr.co.seoulit.insa.empmgmtsvc.pfmevl.entity.PfmEvlEntity;
import kr.co.seoulit.insa.empmgmtsvc.pfmevl.service.PfmEvlService;
import kr.co.seoulit.insa.empmgmtsvc.pfmevl.to.PfmEvlTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;


@RequestMapping("/pfmevl/*")
@RestController
@CrossOrigin
public class PfmEvlSearchController {

    @Autowired
    private PfmEvlService pfmEvlService;


    ModelMap map = null;

    @RequestMapping(value="evaluation-detail", method={RequestMethod.GET, RequestMethod.POST})
    public ModelMap findEmpEvalDetail(@RequestParam(value ="empCode", required = false)String empCode){
        System.out.println(empCode);
        map = new ModelMap();

        try {
            List<PfmEvlEntity> list = pfmEvlService.findEmpEvalDetail(empCode);
            System.out.println("컨트롤라"+empCode);
            map.put("List", list);


        } catch (Exception dae) {
            map.clear();
            map.put("errorCode", -1);
            map.put("errorMsg", dae.getMessage());

        }
        return map;
    }
}
