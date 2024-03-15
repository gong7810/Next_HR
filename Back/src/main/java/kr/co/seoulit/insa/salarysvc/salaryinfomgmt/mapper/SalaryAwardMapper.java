package kr.co.seoulit.insa.salarysvc.salaryinfomgmt.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.ui.ModelMap;

@Mapper
public interface SalaryAwardMapper {
    public void updateSalaryAward(ModelMap map);
}