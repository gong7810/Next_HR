package kr.co.seoulit.insa.empmgmtsvc.pfmevl.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.List;

@Entity
@Data
@Table(name="PFM_EVL")
public class PfmEvlEntity {
        @Id
        private String empCode;
        private String empName;
        private String deptCode;
        private String positionCode;
        private String grade;
        private String durationOfTraining;
        private String numberOfCertificate;
        private String numberOfRestDay;
        private String disqualification;
        private String score;

}
