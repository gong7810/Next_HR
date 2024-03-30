package kr.co.seoulit.insa.sys.service;

import kr.co.seoulit.insa.sys.mapper.LoginMapper;
import kr.co.seoulit.insa.sys.repository.LoginRepository;
import kr.co.seoulit.insa.sys.to.LoginTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class LoginServiceImpl implements LoginService{

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private LoginMapper loginMapper;

    // 사원 확인
    @Override
    public Boolean Login(LoginTO loginTO) {

        Optional<LoginTO> check = loginRepository.findUser(loginTO);

        if (!check.isEmpty()) {
            System.out.println("회원 인증 성공");
            return true;
        }
        System.out.println("존재하지 않는 회원입니다");
        return false;
    }

    // 권한레벨 확인
    @Override
    public String getAuthLevel(LoginTO loginTO) {

        String authLevel = loginMapper.getAuthLevel(loginTO.getEmpCode());
        System.out.println("authLevel "+ authLevel);
        return authLevel;
    }
}
