package kr.co.seoulit.insa.attd.repository;

import kr.co.seoulit.insa.attd.to.BreakAttdTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttdRepository  extends JpaRepository<BreakAttdTO,String> {


}
