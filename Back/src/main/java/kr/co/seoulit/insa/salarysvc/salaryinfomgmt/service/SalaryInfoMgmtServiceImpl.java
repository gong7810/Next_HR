package kr.co.seoulit.insa.salarysvc.salaryinfomgmt.service;

import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.entity.FullTimeSalaryEntity;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.mapper.FullTimeSalaryMapper;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.mapper.RetirementSalMapper;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.mapper.SalaryAwardMapper;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.mapper.SalaryBonusMapper;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.repository.FullTimeSalaryRepository;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.FullTimeSalTO;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.PayDayTO;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.RetirementSalaryTO;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.to.SalaryBonusTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class SalaryInfoMgmtServiceImpl implements SalaryInfoMgmtService{

	@Autowired
	private FullTimeSalaryMapper fullTimeSalaryMapper;
	@Autowired
	private RetirementSalMapper retirementSalMapper;
	@Autowired
	private SalaryBonusMapper salaryBonusMapper;
	@Autowired
	private SalaryAwardMapper salaryAwardMapper;
	@Autowired
	private FullTimeSalaryRepository fullTimeSalaryRepository;

	@Override
	public List<FullTimeSalaryEntity> findselectSalary(String empCode) {

		List<FullTimeSalaryEntity> FullTimeSalList = fullTimeSalaryRepository.findAllByEmpCode(empCode);
		System.out.println("서비스단"+empCode+FullTimeSalList);
		return FullTimeSalList;

	}

	@Override
	public ArrayList<FullTimeSalTO> findSalary() {

		ArrayList<FullTimeSalTO> findtSalarylist =	fullTimeSalaryMapper.findSalary();
		System.out.println("리스트 서비스용====="+findtSalarylist);

		return findtSalarylist;

	}

	@Override
	public ArrayList<FullTimeSalTO> findAllMoney(String applyYearMonth) {

		ArrayList<FullTimeSalTO> findAllMoneyList=null;
		findAllMoneyList = fullTimeSalaryMapper.findAllMoney(applyYearMonth);
		return findAllMoneyList;

	}

	@Override
	public ArrayList<PayDayTO> findPayDayList() {

		ArrayList<PayDayTO> PayDayList=null;
		PayDayList = fullTimeSalaryMapper.selectPayDayList();
		return PayDayList;

	}

	@Override
	public void modifyFullTimeSalary(List<FullTimeSalTO> fullTimeSalary) {

		for(FullTimeSalTO fullTimeSalTO : fullTimeSalary) {
			fullTimeSalaryMapper.updateFullTimeSalary(fullTimeSalTO);
		}
	}

	@Override
	public ArrayList<RetirementSalaryTO> findretirementSalaryList(String empCode) {

		ArrayList<RetirementSalaryTO> retirementSalaryList = retirementSalMapper.selectretirementSalaryList(empCode);
		System.out.println("리턴값"+retirementSalaryList);
		return retirementSalaryList;
	}

	@Override
	public ArrayList<SalaryBonusTO> findBonusSalary(String empCode){

		ArrayList<SalaryBonusTO> SalaryBonusList=null;
		SalaryBonusList = salaryBonusMapper.selectBonusSalary(empCode);
		System.out.println("서비스단"+SalaryBonusList);
		return SalaryBonusList;

	}
	@Override
	public void modifySalaryAward(ModelMap map){
		salaryAwardMapper.updateSalaryAward(map);
		System.out.println("임플");
	}
}
