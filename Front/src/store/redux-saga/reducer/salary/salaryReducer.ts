import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  empList: []
};

const salSlice = createSlice({
  name: 'attdReducer',
  initialState,
  reducers: {
    getEmpListRequest(state, action) {
      console.warn('사원리스트 요청');
    }
  }
});

export const salActions = salSlice.actions;
export default salSlice.reducer;
