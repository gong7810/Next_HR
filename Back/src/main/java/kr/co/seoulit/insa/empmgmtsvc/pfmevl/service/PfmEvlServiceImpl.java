package kr.co.seoulit.insa.empmgmtsvc.pfmevl.service;

import kr.co.seoulit.insa.empmgmtsvc.pfmevl.entity.PfmEvlEntity;
import kr.co.seoulit.insa.empmgmtsvc.pfmevl.mapper.PfmEvlMapper;
import kr.co.seoulit.insa.empmgmtsvc.pfmevl.repository.PfmEvlRepository;
import kr.co.seoulit.insa.empmgmtsvc.pfmevl.to.PfmEvlTO;
import org.apache.ibatis.logging.stdout.StdOutImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.List;

@Service
public class PfmEvlServiceImpl implements PfmEvlService{

	@Autowired
	private PfmEvlRepository pfmEvlRepository;
	@Autowired
	private PfmEvlMapper pfmEvlMapper;

	ArrayList<PfmEvlTO> FindEmpEvalList=null;
	
//	 @Override
//	   public void modifyEmpEvalList(ModelMap map) {
//	         pfmEvlMapper.updatePfmEval(map);
//	   }

	@Override
	public void modifyEmpEvalList(PfmEvlTO pfmEvl, ModelMap map) {

		System.out.println("제발 찍혀줘"+pfmEvl.getEmpCode());
		map.put("empCode", pfmEvl.getEmpCode());
		map.put("durationOfTraining", Integer.parseInt(pfmEvl.getDurationOfTraining()));
		map.put("numberOfCertificate", Integer.parseInt(pfmEvl.getNumberOfCertificate()));
		map.put("disqualification", pfmEvl.getDisqualification());

		pfmEvlMapper.updatePfmEval(map);
	}


	 @Override
	 public List<PfmEvlEntity> findEmpEvalDetail(String empCode) {
		 System.out.println("임플단");
		 return pfmEvlRepository.findAllByEmpCode(empCode);
	 }


}
