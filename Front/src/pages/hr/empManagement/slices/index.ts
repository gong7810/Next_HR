import { combineReducers } from '@reduxjs/toolkit';
import empInfoSlice from './empInfoReducer';
import registerEmpSlice from './registerEmpReducer';
import empEvalSlice from './empEvalReducer';
import empEvalResultSlice from './empEvalResultReducer';
import empEvalManagementSlice from './empEvalManagementReducer';
import empAppointmentSlice from './empAppointmentRegistReducer';
import empAppointmentManagementSlice from './empAppointmentManagementReducer';
import empAppointmentResultSlice from './empAppointmentResultReducer';

const empManagementReducer = combineReducers({
  empInfo: empInfoSlice.reducer,
  registerEmp: registerEmpSlice.reducer,
  empEval: empEvalSlice.reducer,
  empEvalResult: empEvalResultSlice.reducer,
  empEvalManagement: empEvalManagementSlice.reducer,
  empAppointment: empAppointmentSlice.reducer,
  empAppointmentManagement: empAppointmentManagementSlice.reducer,
  empAppointmentResult: empAppointmentResultSlice.reducer
});
export default empManagementReducer;
