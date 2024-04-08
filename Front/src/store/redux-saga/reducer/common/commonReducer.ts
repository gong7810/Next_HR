import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  refreshToken: '',
  authLevel: ''
};

const commonSlice = createSlice({
  name: 'commonReducer',
  initialState,
  reducers: {
    getLoginTokenRequest(state, action) {
      console.warn('jwt 토큰 요청');
    },
    getLoginTokenSuccess(state, action) {
      console.warn('state 업데이트');
      const { accessToken, authLevel, empName, position } = action.payload;
      state.accessToken = accessToken;
      state.authLevel = authLevel;
      // 추후 state에선 token, authLevel 삭제
      // localStorage에서 관리할 예정
      localStorage.setItem('access', accessToken);
      localStorage.setItem('authLevel', authLevel);
      localStorage.setItem('empName', empName);
      localStorage.setItem('position', position);
      // localStorage.setItem('refresh', refreshToken);
    },
    getTokenCheckRequest(state, action) {
      console.warn('jwt 토큰 검증 요청');
    },
    removeTokenRequest(state, action) {
      console.warn('jwt 토큰 삭제 요청 (로그아웃)');
    },
    removeTokenSuccess(state) {
      console.warn('state 업데이트');
      state.accessToken = '';
      state.authLevel = '';
      localStorage.removeItem('access');
      localStorage.removeItem('authLevel');
      localStorage.removeItem('empName');
      localStorage.removeItem('position');
      localStorage.clear();
    }
  }
});

export const commonActions = commonSlice.actions;
export default commonSlice.reducer;
