/*eslint-disable*/

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//************************* 급여 기준 관리 시작 *************************

type StateType = {
//  salaryList: [];
  baseSalaryList: any[];
  isLoading: boolean;
  error: any;
  isDone: boolean;
};

const initialState: StateType = {
//  salaryList: [],
  baseSalaryList: [],
  isLoading: false,
  error: null,
  isDone: false,
};

const baseSalary = createSlice({
  name: 'baseSalary',
  initialState: initialState,
  reducers: {
    REQUEST_BASE_SALARY(state:StateType) {
      state.isLoading = true;
    },
    BASE_SALARY_LIST_SUCCESS(state:StateType, action:PayloadAction<any>) {
      state.isLoading = false;
      state.baseSalaryList = [...action.payload.data.baseSalaryList];
      state.isDone = true;
    },
    BASE_SALARY_LIST_FAILURE(state:StateType) {
      state.isLoading = false;
      state.error = '기본급여정보 조회 실패';
      state.isDone = false;
    },
    //급여기준관리 수정 로직
    // UPDATE_BASE_SALARY_SUCCESS(state, action) {},
    // UPDATE_BASE_SALARY_FAILURE(state) {
    //   state.error = '기본급여정보 수정 실패';
    // }
  }
});

//reducer export
export default baseSalary.reducer;

//action export
export const {
  REQUEST_BASE_SALARY,
  BASE_SALARY_LIST_SUCCESS,
  BASE_SALARY_LIST_FAILURE,
  // UPDATE_BASE_SALARY_SUCCESS,
  // UPDATE_BASE_SALARY_FAILURE
} = baseSalary.actions;
