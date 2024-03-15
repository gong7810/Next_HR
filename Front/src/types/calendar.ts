import { FormikValues } from 'formik';
import { HolidayTO } from 'pages/hr/base/types/types';

export type Event = {
  id: string;
  allDay: boolean;
  color: string;
  textColor?: string;
  description: string;
  start: Date;
  end: Date;
  title: string;
};

export interface CalendarStateProps extends HolidayTO{
  holidayList: HolidayTO[];
  applyDay?: any;
  holidayName?: any;
  holidayCode?:any;
  note?: any;
  status?:any;
  events: FormikValues[];
  error: object | string | null;
}
