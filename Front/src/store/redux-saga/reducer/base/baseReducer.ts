import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authList: [], // 권한 목록
  codeList: [] // 코드 목록
};

const baseSlice = createSlice({
  name: 'baseReducer',
  initialState,
  reducers: {
    getAuthListRequest(state) {
      console.warn('권한리스트 요청');
    },
    getAuthListSuccess(state, action) {
      console.warn('state 업데이트', action.payload);
      state.authList = action.payload;
    },
    getCodeListRequest(state) {
      console.warn('코드리스트 요청');
    },
    getCodeListSuccess(state, action) {
      console.warn('state 업데이트', action.payload);
      state.codeList = action.payload;
    }
  }
});

export const baseActions = baseSlice.actions;
export default baseSlice.reducer;
