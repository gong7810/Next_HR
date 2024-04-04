package kr.co.seoulit.insa.commsvc.systemmgmt.repository;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.AuthTO;
import kr.co.seoulit.insa.commsvc.systemmgmt.to.DetailCodeTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;

public interface HrSystemRepository  extends JpaRepository<AuthTO, String> {

    // 권한 조회
    @Query("SELECT auth FROM AuthTO auth ORDER BY auth.positionCode")
    ArrayList<AuthTO> findAllOrderByPositionCode();

    // 코드 조회
    @Query("SELECT code FROM DetailCodeTO code ORDER BY code.detailCodeNumber")
    ArrayList<DetailCodeTO> findAllOrderByCode();
}
