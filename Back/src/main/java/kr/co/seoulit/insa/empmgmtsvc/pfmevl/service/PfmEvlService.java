package kr.co.seoulit.insa.empmgmtsvc.pfmevl.service;

import kr.co.seoulit.insa.empmgmtsvc.pfmevl.entity.PfmEvlEntity;
import kr.co.seoulit.insa.empmgmtsvc.pfmevl.to.PfmEvlTO;
import org.springframework.ui.ModelMap;

import java.util.ArrayList;
import java.util.List;

public interface PfmEvlService {
	//public void modifyEmpEvalList(ModelMap map);
	public void modifyEmpEvalList(PfmEvlTO pfmEvl, ModelMap map);
	public List<PfmEvlEntity> findEmpEvalDetail(String empCode) throws Exception;
}
