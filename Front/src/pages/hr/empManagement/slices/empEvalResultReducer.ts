import { createSlice } from '@reduxjs/toolkit';

type registerStatus = { empList: []; errorCode: number; fetchStatus: boolean };

const initialState: registerStatus = { empList: [], errorCode: 1, fetchStatus: false };

const empEvalResultSlice = createSlice({
  name: 'empEvalResult',
  initialState: initialState,
  reducers: {
    EMP_EVAL_RESULT_FETCH_REQUESTED(status) {
      console.log('EMP_EVAL_RESULT_FETCH_REQUESTED called!!!');
    },
    EMP_EVAL_RESULT_FETCH_STATUS(state, action) {
      state.fetchStatus = !state.fetchStatus;
      const { errorCode, empList } = action.payload;
      state.empList = empList;
      console.log('empList is :', empList, errorCode);
    },
    EMP_EVAL_RESULT_FETCH_REQUESTED_BY_APPROVAL_CONDITION(state, action) {},
    EMP_EVAL_RESULT_FETCH_REQUESTED_BY_APPROVAL_CONDITION_STATUS(state, action) {
      console.log('EMP_EVAL_RESULT_FETCH_REQUESTED_BY_APPROVAL_STATUS called');
      const { errorCode, empList } = action.payload;
      console.log('EMP_EVAL_RESULT_FETCH_REQUESTED_BY_APPROVAL_CONDITION_STATUS', empList, errorCode);
      state.empList = empList;
    }
  }
});

export const empEvalResultAction = empEvalResultSlice.actions;

export default empEvalResultSlice;
