package kr.co.seoulit.insa.salarysvc.salaryinfomgmt.repository;


import kr.co.seoulit.insa.empmgmtsvc.pfmevl.entity.PfmEvlEntity;
import kr.co.seoulit.insa.salarysvc.salaryinfomgmt.entity.FullTimeSalaryEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FullTimeSalaryRepository extends CrudRepository<FullTimeSalaryEntity, String> {

    List<FullTimeSalaryEntity> findAllByEmpCode(String empCode);
}
