interface ColumnProps {
  id: string;
  label: string;
  minWidth?: number;
  data?: any;
  align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
  format?: (value: Date | number) => string | boolean;
  hide?: boolean;
  editable?: true;
}

export default ColumnProps;

export interface AnnualLeaveMgtTO {
  empCode: string;
  empName: string;
  applyYearMonth: string;
  monthlyLeave: string;
  remainingHoliday: string;
  finalizeStatus: string;
}


export interface FullTimeSalaryEntity {
  empCode: string;
  basicSalary: string;
  positionSalary: string;
  familySalary: string;
  mealSalary: string;
  benefit: string;
  totalExtSal: string;
  totalDeduction: string;
  realSalary: string;
}

export interface SalaryBonusTO {
  empCode: string;
  empName: string;
  deptCode: string;
  position: string;
  baseSalary: string;
  benefit: string;
  grade: string;
  hobong: string;
}

export interface BaseSalaryTO {
  positionCode: string;
  position: string;
  baseSalary: string;
  hobongRatio: string;
}

export interface RetirementSalaryTO {
  position: string;
  empname: string;
  empcode: string;
  hiredate: string;
  settlementdate: string;
  workingdate: string;
  retirementsalary: string;
}

export interface retirementSalaryTO {
  hireDate: string;
  severanceType: string;
  empCode: string;
  workDays: boolean;
  severancePay?: string;
  retireDate:string;
}

export interface BaseExtSalTO {
  extSalCode: string;
  extSalName: string;
  ratio: string;
}