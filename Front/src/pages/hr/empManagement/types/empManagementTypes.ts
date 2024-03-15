//registerEmp types

export type sendData = {
  gender: string;
  lastSchool: string;
  occupation: string;
  employment: string;
};

//==========================================================================
//  EmpModifyModal types
export interface ModifyEmpInfoEntity {
  empCode: string;
  empName: string;
  email: string;
  deptName: string;
  positionCode: string;
  gender: string;
  address: string;
  birthdate: string;
  mobileNumber: string;
  deptCode: string;
  detailAddress: string;
  postNumber: string;
  lastSchool: string;
}

//========================================================
//empInfo types

export interface EmpInfoEntity {
  empCode: string;
  empName: string;
  email: string;
  deptName: string;
  positionCode: string;
  gender: string;
  address: string;
  birthdate: string;
  mobileNumber: string;
  deptCode: string;
  detailAddress: string;
  postNumber: string;
  lastSchool: string;
}

//==========================================================
//empEvaluation
export type EvalEmpInfo = {
  empName: string;
  empCode: string;
  ability: string;
  achievement: string;
  approvalStatus: string;
  attitude: string;
  deptName: string;
  durationOfTraining: string;
  grade: string;
  position: string;
  numberOfCertificate: string;
  applyDay: string;
};

export type EvalEmpInfoEntity = {
  empCode: string;
  empName: string;
  lastSchool: string;
  numberOfCertificate: string;
  applyDay: string;
  durationOfTraining: string;
  deptName: string;
  position: string;
  achievement: string;
  ability: string;
  apporvalStatus: string;
  grade: string;
  attitude: string;
};
//======================================================
//empEvalManagement
export interface EmpEvalManagementInfoEntity {
  empCode: string;
  empName: string;
  applyDay: string;
  deptName: string;
  position: string;
  approvalStatus: string;
  grade: string;
}

//=================================================================
//empEvaluationResult

export interface EmpEvalResultInfoEntity {
  empCode: string;
  empName: string;
  applyDay: string;
  deptName: string;
  position: string;
  approvalStatus: string;
  grade: string;
}
//==================================================================
//registerEmpAppointment
export interface EmpAppointmentInfoEntity {
  empCode: string;
  empName: string;
  email: string;
  deptName: string;
  positionCode: string;
  gender: string;
  address: string;
  birthdate: string;
  mobileNumber: string;
  deptCode: string;
  detailAddress: string;
  postNumber: string;
  lastSchool: string;
}

//=================================================================
//EmpAppointmentModal
export type dataType = {
  empCode: string;
  hosu: string;
  afterChange: string | number;
  startDate: string | undefined;
  endDate: string | undefined;
  type: string;
};

export type AppointmentEmpInfo = {
  empCode: string;
  empName: string;
  deptCode: string;
  positionCode: string;
};

//==================================================================
//empAppointmentManagement
export interface EmpAppointmentManagementInfoEntity {
  hosu: string;
  empCode: string;
  requestDate: string;
  beforeChange: string;
  afterChange: string;
  approvalStatus: string;
}
//================================================================
//empAppointmentResult

export interface EmpAppointmentResultInfoEntity {
  hosu: string;
  empCode: string;
  requestDate: string;
  beforeChange: string;
  afterChange: string;
  approvalStatus: string;
}

//==================================================================
// saga types
export type typeAction = { payload: any; type: string };
