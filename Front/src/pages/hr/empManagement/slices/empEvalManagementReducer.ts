import { createSlice } from '@reduxjs/toolkit';

type registerStatus = { errorCode: string; errorMsg: string; empList: []; fetchStatus: boolean };

const initialState: registerStatus = { errorCode: '', errorMsg: '', empList: [], fetchStatus: false };

const empEvalManagementSlice = createSlice({
  name: 'empEvalManagement',
  initialState: initialState,
  reducers: {
    EMP_EVAL_FETCH_REQUESTED(state) {
      state.empList = [];
    },
    EMP_EVAL_FETCH_STATUS(state, action) {
      const { errorCode, errorMsg, empList } = action.payload;
      console.log('action.payload from EMP_EVAL_MANAGEMENT_STATUS', errorCode, errorMsg, empList);
      state.errorCode = errorCode;
      state.errorMsg = errorMsg;
      state.empList = empList;
      console.log('error? : ', errorCode === -1 ? 'error occured' : 'error not occured');
      console.log('typeof ErrorCode', typeof errorCode);
    },
    MODIFY_APPROVED_EMP_EVAL(state, action) {
      console.log('MODIFY_APPROVED_EMP_EVAL called');
    },
    MODIFY_APPROVED_EMP_EVAL_STATUS(state, action) {
      state.fetchStatus = !state.fetchStatus;
      console.log('MODIFY_APPROVED_EMP_EVAL_STATUS', action.payload);
    },
    MODIFY_REJECTED_EMP_EVAL(state, action) {},
    MODIFY_REJECTED_EMP_EVAL_STATUS(state, action) {
      state.fetchStatus = !state.fetchStatus;
      console.log('MODIFY_REJECTED_EMP_EVAL_STATUS', action.payload);
    },
    DELETE_EMP_EVAL(state, action) {
      state.empList = [];
    }, // 사원고과를 삭제
    DELETE_EMP_EVAL_STATUS(state, action) {
      state.fetchStatus = !state.fetchStatus;
      console.log('DELETE_EMP_EVAL_STATUS called');
    }
  }
});

export const empEvalManagementAction = empEvalManagementSlice.actions;

export default empEvalManagementSlice;
