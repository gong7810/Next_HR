package kr.co.seoulit.insa.empmgmtsvc.pfmevl.mapper;

import kr.co.seoulit.insa.empmgmtsvc.pfmevl.to.PfmEvlTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;

import java.util.ArrayList;

@Mapper
public interface PfmEvlMapper {
	 public void updatePfmEval(ModelMap map);
	 public ArrayList<PfmEvlTO> selectPfmEvalDetail(String empCode);
}
