import { createSlice } from '@reduxjs/toolkit';

type registerStatus = { errorCode: string; errorMsg: string };

let initialState: registerStatus = { errorCode: '', errorMsg: '' };

const empEvalSlice = createSlice({
  name: 'empEval',
  initialState: initialState,
  reducers: {
    EMP_EVAL_REQUSTED(state, action) {},
    EMP_EVAL_STATUS(state, action) {
      const { errorCode, errorMsg } = action.payload;
      console.log('action.payload from EMP_EVAL_STATUS', errorCode, errorMsg);
      state.errorCode = errorCode;
      state.errorMsg = errorMsg;
    }
  }
});

export const empEvalAction = empEvalSlice.actions;

export default empEvalSlice;
