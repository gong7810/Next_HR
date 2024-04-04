// third-party
import { createSlice } from '@reduxjs/toolkit';

// types
import { DefaultRootStateProps } from 'types';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['Position'] = {
  error: null,
  positionList: [],
  isLoading: false,
  isDone: false
};

const slice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    getPosition1(state) {
      state.isLoading = true;
    },

    // GET POSITION
    getPositionSuccess(state, action) {
      state.isLoading = false;
      state.positionList = action.payload;
      state.isDone = true;
    },

    getPositionFailure(state) {
      state.isLoading = false;
      state.error = '직급정보 조회 실패';
    }
  }
});

export default slice.reducer;
export const { getPosition1, getPositionFailure, hasError, getPositionSuccess } = slice.actions;
