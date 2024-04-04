import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deptList: [],
  empList: [],
  severancePayList: [],
};

const salSlice = createSlice({
  name: 'salReducer',
  initialState,
  reducers: {
    getDeptListRequest(state) {
      console.warn('부서 조회');
    },
    getDeptListSuccess(state, action) {
      console.warn('부서조회 성공', action.payload);
      state.deptList = action.payload;
    },
    getEmpListRequest(state, action) {
      console.warn('사원 조회');
    },
    getEmptListSuccess(state, action) {
      console.warn('사원조회 성공', action.payload);
      state.empList = action.payload;
    },
    getSeverancePayListRequest(state, action) {
      console.warn('퇴직금 조회', action);
    },
    getSeverancePayListSuccess(state, action) {
      console.warn('퇴직금 조회 성공', action.payload);
      state.severancePayList = action.payload;
    },
    removeSeverancePayListRequest(state, action) {
      console.warn('퇴직금 삭제', action);
    },
    removeSeverancePayListSuccess(state, action) {
      console.warn('퇴직금 삭제 성공', action);
    },
    registSeverancePayRequest(state, action) {
      console.warn('퇴직금 등록', action);
    },
    registSeverancePaySuccess(state, action) {
      console.warn('퇴직금 등록 성공', action.payload);
      state.severancePayList = action.payload;
    },

  }
});

export const salActions = salSlice.actions;
export default salSlice.reducer;
