import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  refreshToken: ''
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
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    }
  }
});

export const commonActions = commonSlice.actions;
export default commonSlice.reducer;
