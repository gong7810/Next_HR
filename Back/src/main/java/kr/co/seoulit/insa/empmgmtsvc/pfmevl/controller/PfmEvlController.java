package kr.co.seoulit.insa.empmgmtsvc.pfmevl.controller;

import kr.co.seoulit.insa.empmgmtsvc.pfmevl.service.PfmEvlService;
import kr.co.seoulit.insa.empmgmtsvc.pfmevl.to.PfmEvlTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;


@RequestMapping("/pfmevl/*")
@RestController
@CrossOrigin
public class PfmEvlController {

   @Autowired
   private PfmEvlService pfmEvlService;
   
   ModelMap map = null;

//   @RequestMapping(value ="/employee-evaluation" , method = {RequestMethod.POST, RequestMethod.GET})
//   public ModelMap modifyEmpEvalList(@RequestParam(value ="empCode", required = false)String empCode
//           ,@RequestParam(value ="numberOfCertificate", required = false) String numberOfCertificate
//           ,@RequestParam(value ="durationOfTraining", required = false) String durationOfTraining
//           ,@RequestParam(value ="disqualification", required = false) String disqualification
//         ) {
//      //@RequestBody(PfmEvlTo pfmevl)
//
//      System.out.println("check");
//      System.out.println(empCode);
//
//      map = new ModelMap();
//      map.put("empCode", empCode);
//      map.put("numberOfCertificate",Integer.parseInt(numberOfCertificate));
//      map.put("durationOfTraining",Integer.parseInt(durationOfTraining));
//      map.put("disqualification", disqualification);
//
//
//
//      try {
//
//         pfmEvlService.modifyEmpEvalList(map);
//         map.put("errorMsg","success");
//         map.put("errorCode", 0);
//
//
//      } catch (Exception dae) {
//         map.clear();
//         map.put("errorCode", -1);
//         map.put("errorMsg", dae.getMessage());
//
//      }
//      return map;

      @RequestMapping(value ="/employee-evaluation" , method = {RequestMethod.POST, RequestMethod.GET})
      public ModelMap modifyEmpEvalList(@RequestBody PfmEvlTO pfmEvl)

          {

         System.out.println("check");
         System.out.println(pfmEvl);

         map = new ModelMap();



         try {
            pfmEvlService.modifyEmpEvalList(pfmEvl, map);
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