package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to;

import java.util.ArrayList;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode(callSuper = false)
public class EmpTO extends BaseTO {

    private String empCode;
    private String empName;
    private String birthdate;
    private String gender;
    private String mobileNumber;
    private String address;
    private String detailAddress;
    private String postNumber;
    private String email;
    private String lastSchool;
    private String imgExtend;
    private String deptName;
    private String position;
    private String hobong;
    private String occupation;
    private String employment;
    private String deptCode;
    private String authority;
    private String hiredate;
    private String achievement;
    private String ability;
    private String attitude;
    private String status;

    private ArrayList<FamilyInfoTO> familyInfoList;
    private ArrayList<LicenseInfoTO> licenseInfoList;
    private ArrayList<WorkInfoTO> workInfo;




}