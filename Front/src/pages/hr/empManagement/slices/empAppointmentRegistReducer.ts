import { createSlice } from '@reduxjs/toolkit';

type empList = { empList: []; errorCode: number; errorMsg: string; fetchStatus: boolean; hosu: string };

let initialState: empList = { empList: [], errorCode: 1, errorMsg: '', fetchStatus: false, hosu: '' };

const empAppointmentSlice = createSlice({
  name: 'empAppointment',
  initialState: initialState,
  reducers: {
    EMP_FETCH_REQUESTED(state, actionn) {},
    EMP_FETCH_STATUS(state, action) {
      const { empList, errorCode, errorMsg } = action.payload;
      console.log('data is : ', empList, errorCode, errorMsg);
      state.empList = empList;
    },
    GET_HOSU_REQUESTED(state) {},
    GET_HOSU_STATUS(state, action) {
      const { hosu, errorCode, errorMsg } = action.payload;
      console.log('hosu related data from reducer is  :', hosu, errorCode, errorMsg);
      state.hosu = hosu;
    },
    REGISTER_EMP_APPOINTMENT_REQUESTED(state, action) {},
    REGISTER_EMP_APPOINTMENT_STATUS(state, action) {}
  }
});

export const empAppointmentAction = empAppointmentSlice.actions;

export default empAppointmentSlice;
