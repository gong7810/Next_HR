import { createSlice } from '@reduxjs/toolkit';
import { breakAttdTO, restAttdTO } from 'pages/hr/attendance/types/types';

const initialState = {
  empList: [], // 사원 목록
  restAttdList: [] as restAttdTO[], // 근태외 내역
  breakAttdList: [] as breakAttdTO[] // 연차 내역
};

const attdSlice = createSlice({
  name: 'attdReducer',
  initialState,
  reducers: {
    getEmpListRequest(state) {
      console.warn('사원리스트 요청');
    },
    getEmpListSuccess(state, action) {
      console.warn('state 업데이트', action.payload);
      state.empList = action.payload;
    },
    getRestAttdListRequest(state, action) {
      console.warn('근태외 리스트 요청', action);
    },
    getRestAttdListSuccess(state, action) {
      console.warn('state 업데이트', action.payload);
      state.restAttdList = action.payload;
    },
    registRestAttdRequest(state, action) {
      console.warn('근태외 등록 요청', action);
    },
    registRestAttdSuccess(state, action) {
      console.warn('state 업데이트', action.payload);
      state.restAttdList = action.payload;
    },
    approvalRestAttdRequest(state, action) {
      console.warn('근태외 승인 요청', action);
    },
    romoveRestAttdRequest(state, action) {
      console.warn('근태외 삭제 요청', action);
    },
    getBreakAttdListRequest(state, action) {
      console.warn('연차 내역 조회 요청', action);
    },
    getBreakAttdListSuccess(state, action) {
      console.warn('state 업데이트', action.payload);
      state.breakAttdList = action.payload;
    },
    registBreakAttdRequest(state, action) {
      console.warn('연차 신청 요청', action);
    },
    approvalBreakAttdRequest(state, action) {
      console.warn('연차 승인/반려/취소 요청', action);
    },
    romoveBreakAttdRequest(state, action) {
      console.warn('연차 삭제 요청', action);
    }
  }
});

export const attdActions = attdSlice.actions;
export default attdSlice.reducer;
