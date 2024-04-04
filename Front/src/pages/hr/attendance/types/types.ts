interface ColumnProps {
  id: string;
  label: string;
  minWidth: number;
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

export interface RestAttdTO {
  empCode: string;
  empName: string;
  restTypeCode: string;
  requestDate: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  numberOfDays: string;
  cause: string;
  applovalStatus: string;
}

export interface dailyAttdEntity {
  empName: string;
  deptName: string;
  attendTime: string;
  leaveTime: string;
  briefLeaveTime: string;
  workHour: string;
  latenessStatus: string;
  overWorkHour: string;
  nightWorkHour: string;
  finalizeStatus: string;
  earlyLeaveTime: string;
}
export interface restAttdTO {
  restAttdNo?: string;
  empCode: string;
  deptCode?: string;
  attdCode: string;
  attdType: string;
  requestDate: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  cause: string;
  approvalStatus?: string;
  authority?: string;
}

export interface breakAttdTO {
  empName: string;
  deptCode?: string;
  attdType: string;
  startDate: string;
  endDate: string;
  cause: string;
  approvalStatus?: string;
  remainBreakAttd: string;
  authority?: string;
}
