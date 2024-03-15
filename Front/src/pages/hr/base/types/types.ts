// project import
import { NavItemType } from 'types';

// ==============================|| MENU TYPES ||============================== //

export interface ColumnProps{
    id:any;
    label:string;

  
}

export interface HolidayTO{
    applyDay?: string;
    holidayName?: string;
    holidayCode?:string;
    note?: string;
    status?:string;
}

export interface WorkTimeTO{
    applyYear:any;
    attendTime:string;
    lunchStartTime:string;
    lunchEndTime:string;
    quitTime:string;
    dinnerStartTime:string;
    dinnerEndTime:string;
    overEndTime:string;
    nightEndTime:string;
    status?:any;
    showTextFields?:boolean;
}

export interface DepTO{
    deptCode?:string;
    deptName?:string;
    deptTel?:string;
    status?:string;
    id?:string;
}

export interface PositionTO{
    positionCode?:string;
    position?:string;
    basesalary?:string;
    hobongratio?:string;
    error?:string;
    status?:string;
}
// export interface NewRow{
//     applyDay:string;
//     holidayName:string;
//     note?:string;
//     status?:string;
// }

