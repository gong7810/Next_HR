import { HolidayTO } from "pages/hr/base/types/types";



export interface HolidayProps {
  holidayList: HolidayTO[];
  error?: object | string | null;
  isLoading?:any;
  isDone?:any;
}
