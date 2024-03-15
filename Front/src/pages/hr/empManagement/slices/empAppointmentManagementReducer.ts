import { createSlice } from '@reduxjs/toolkit';

type appointmentStatus = { errorCode: string; errorMsg: string; empList: []; fetchStatus: boolean };

const initialState: appointmentStatus = { errorCode: '', errorMsg: '', empList: [], fetchStatus: false };

const empAppointmentManagementSlice = createSlice({
  name: 'empAppointmentManagement',
  initialState: initialState,
  reducers: {
    EMP_APPOINTMENT_FETCH_REQUESTED(state) {
      console.log('empAppointmentManagementSlice has been called.');
    },
    EMP_APPOINTMENT_FETCH_STATUS(state, action) {
      const { errorCode, errorMsg, empList } = action.payload;
      console.log('fetched data at empAppointmentManagementReducer is :', errorCode, errorMsg, empList);
      state.errorCode = errorCode;
      state.errorMsg = errorMsg;
      state.empList = empList;
    },
    MODIFY_APPROVED_EMP_APPOINTMENT(state, action) {
      console.log('modify_approved_emp_appointment');
    },
    MODIFY_APPROVED_EMP_APPOINTMENT_STATUS(state, action) {
      const { errorCode, errorMsg } = action.payload;
      state.fetchStatus = !state.fetchStatus;
    },
    MODIFY_REJECTED_EMP_APPOINTMENT(state, action) {
      console.log('modify_rejected_emp_appointment reducer called', action);
    },
    MODIFY_REJECTED_EMP_APPOINTMENT_STATUS(state, action) {
      const { errorCode, ErrorMsg } = action.payload;
      state.fetchStatus = !state.fetchStatus;
    }
  }
});

export const empAppointmentManagementAction = empAppointmentManagementSlice.actions;

export default empAppointmentManagementSlice;
