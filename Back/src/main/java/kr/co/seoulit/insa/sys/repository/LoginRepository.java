package kr.co.seoulit.insa.sys.repository;

import kr.co.seoulit.insa.sys.to.LoginTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface LoginRepository extends JpaRepository<LoginTO, String> {

    @Query("SELECT auth FROM LoginTO auth WHERE auth.id = :#{#loginTO.id} and auth.pw = :#{#loginTO.pw}")
    Optional<LoginTO> findUser(@Param("loginTO") LoginTO loginTO);

}
