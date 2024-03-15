import { createSlice } from '@reduxjs/toolkit';

type appointmentStatus = { errorCode: string; errorMsg: string; empList: [] };

const initialState: appointmentStatus = { errorCode: '', errorMsg: '', empList: [] };

const empAppointmentResultSlice = createSlice({
  name: 'empAppointmentManagement',
  initialState: initialState,
  reducers: {
    EMP_APPOINTMENT_RESULT(state) {
      console.log('emp_appointment called');
    },
    EMP_APPOINTMENT_RESULT_STATUS(state, action) {
      const { errorCode, errorMsg, list } = action.payload;
      state.empList = list;
      state.errorCode = errorCode;
      state.errorMsg = errorMsg;
      console.log('list is : ', list);
    }
  }
});

export const empAppointmentResultAction = empAppointmentResultSlice.actions;

export default empAppointmentResultSlice;
