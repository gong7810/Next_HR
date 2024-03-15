package kr.co.seoulit.insa.empmgmtsvc.pfmevl.repository;

import kr.co.seoulit.insa.empmgmtsvc.pfmevl.entity.PfmEvlEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PfmEvlRepository extends CrudRepository<PfmEvlEntity, String> {
    List<PfmEvlEntity> findAllByEmpCode(String empCode);
}
