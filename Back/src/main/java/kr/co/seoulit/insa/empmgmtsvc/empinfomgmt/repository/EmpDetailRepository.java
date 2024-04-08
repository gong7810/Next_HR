package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.repository;

import kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.entity.EmpDetailEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmpDetailRepository extends CrudRepository<EmpDetailEntity, String> {

    // 본인 직급 이하 사원 부서별 조회
    @Query("SELECT e FROM EmpDetailEntity e WHERE e.deptCode = :#{#deptCode} AND e.authority < :#{#authLevel} ORDER BY e.empCode")
    List<EmpDetailEntity> findSubAllByDeptCodeOrderByEmpCodeAsc(@Param("deptCode") String deptCode, @Param("authLevel") String authLevel);

    // 본인 직급 이하 사원 조회
    @Query("SELECT e FROM EmpDetailEntity e WHERE e.authority < :#{#authLevel} ORDER BY e.empCode")
    List<EmpDetailEntity> findSubAll(@Param("authLevel") String authLevel);

    // 사원 전체 부서별 조회
    @Query("SELECT e FROM EmpDetailEntity e WHERE e.deptCode = :#{#deptCode} ORDER BY e.empCode")
    List<EmpDetailEntity> findAllByDeptCodeOrderByEmpCodeAsc(@Param("deptCode") String deptCode);

    // 사원 전체 조회
    @Query("SELECT e FROM EmpDetailEntity e ORDER BY e.empCode")
    List<EmpDetailEntity> findAll();
}
