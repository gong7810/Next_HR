package kr.co.seoulit.insa.empmgmtsvc.empinfomgmt.to;

import java.util.ArrayList;

import kr.co.seoulit.insa.commsvc.systemmgmt.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Transient;

@Data
@ToString
@EqualsAndHashCode(callSuper = false)
public class EmpTO extends BaseTO {

    private String empCode;
    private String empName;
    private String deptCode;
    private String birthDate;
    private String gender;
    private String mobileNumber;
    private String address;
    private String detailAddress;
    private String postNumber;
    private String email;
    private String lastSchool;
    private String position;

    @Transient
    private String imgExtend;
    @Transient
    private String hobong;
    @Transient
    private String occupation;
    @Transient
    private String employment;
    @Transient
    private String authority;
    @Transient
    private String hiredate;
    @Transient
    private String achievement;
    @Transient
    private String ability;
    @Transient
    private String attitude;
    @Transient
    private String status;

    @Transient
    ArrayList<FamilyInfoTO> familyInfoList;
    @Transient
    ArrayList<LicenseInfoTO> licenseInfoList;
    @Transient
    ArrayList<WorkInfoTO> workInfo;


    public String getImgExtend() {
        return "jpg";
    }

    public void setWorkInfo(ArrayList<WorkInfoTO> workInfo) {
        this.workInfo = workInfo;
    }

}