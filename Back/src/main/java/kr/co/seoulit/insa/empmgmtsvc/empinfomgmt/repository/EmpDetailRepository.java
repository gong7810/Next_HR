package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.repository;

import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.entity.EmpDetailEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmpDetailRepository extends CrudRepository<EmpDetailEntity, String> {
    List<EmpDetailEntity> findAllByDeptCodeOrderByEmpCodeAsc(String deptName);
    List<EmpDetailEntity> findAll();
}
