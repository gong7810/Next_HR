import { PositionTO } from "pages/hr/base/types/types";


export interface PositionProps {
  positionList: PositionTO[];
  error?: object | string | null;
  isLoading?:any;
  isDone?:any;
}
