import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  empList: []
};

const attdSlice = createSlice({
  name: 'attdReducer',
  initialState,
  reducers: {
    getEmpListRequest(state, action) {
      console.warn('사원리스트 요청');
    }
  }
});

export const attdActions = attdSlice.actions;
export default attdSlice.reducer;
