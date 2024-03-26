import { createSlice } from '@reduxjs/toolkit';

type dayAttdlist = { dayAttdlist: any[]; empCode: string; errorCode: number; errorMsg: string | null; empList: any[];};

let initialState: dayAttdlist = { dayAttdlist: [], empCode: '', errorCode: 0, errorMsg: '', empList: []};

const dailyAttendSlice = createSlice({
  name: 'dailyAttendInsertResult',
  initialState: initialState,
  reducers: {
    DAILY_ATTEND_INSERT_FETCH_REQUESTED(state, action) {
      console.log('This is Reducer!! DAILY_ATTEND_INSERT_FETCH_REQUESTED called!!!');
    },
    DAILY_ATTEND_INSERT_FETCH_STATUS(state, action) {
      const { errorCode, errorMsg } = action.payload;
      console.log('action.payload from dailtAttend', errorCode, errorMsg);
      state.errorCode = errorCode;
      state.errorMsg = errorMsg;
    },
    DAILY_ATTEND_MODIFY_FETCH_REQUESTED(state, action) {
      console.log('This is Reducer!! DAILY_ATTEND_MODIFY_FETCH_REQUESTED called!!!');
      console.log('data from reducer is: ', action.payload);
    },
    DAILY_ATTEND_MODIFY_FETCH_STATUS(state, action) {
      const { errorCode, errorMsg } = action.payload;
      console.log('action.payload from dailtAttend', errorCode, errorMsg);
      state.errorCode = errorCode;
      state.errorMsg = errorMsg;
    },
    DAILY_ATTEND_SEARCH_FETCH_REQUESTED(state, action) {
      console.log('data from reducer is: ', action.payload);
      console.log('This is Reducer!! DAILY_ATTEND_SEARCH_FETCH_REQUESTED called!!!');
    },
    DAILY_ATTEND_SEARCH_FETCH_STATUS(state, action) {
     console.log('This is Reducer!! DAILY_ATTEND_SEARCH_FETCH_STATUS called!!!');
     const { dayAttdlist, errorMsg, errorCode} = action.payload;
     console.log("dayAttdlist: " + dayAttdlist);

     state.dayAttdlist = dayAttdlist;
     state.errorMsg = errorMsg;
     state.errorCode = errorCode;

    },
    DAILY_ATTEND_SEARCH_EMPLIST_FETCH_REQUESTED(state, action) {
      console.log('data from reducer is: ', action.payload);
      console.log('This is Reducer!! DAILY_ATTEND_SEARCH_EMPLIST_FETCH_REQUESTED called!!!');
    },
    DAILY_ATTEND_SEARCH_EMPLIST_FETCH_STATUS(state, action) {
      console.log('This is Reducer!! DAILY_ATTEND_SEARCH_EMPLIST_FETCH_STATUS called!!!');
      
      const { empList, errorMsg, errorCode } = action.payload;

      console.log('This is empList: ' + empList);
      state.empList = empList;
      state.empCode = errorCode;
      state.errorMsg = errorMsg;

    },
    DAILY_ATTEND_FINALIZE_FETCH_REQUESTED(state, action) {
      console.log('This is Reducer!! DAILY_ATTEND_FINALIZE_FETCH_REQUESTED called!!!');
    },
    DAILY_ATTEND_FINALIZE_FETCH_STATUS(state, action) {
      const { errorCode, errorMsg } = action.payload;
      console.log('action.payload from dailtAttend', errorCode, errorMsg);
      state.errorCode = errorCode;
      state.errorMsg = errorMsg;
    },
    CLEAR_ATTD_LIST(state, action) {
      console.log('This is Reducer!! CLEAR_ATTD_LIST called!!!');
      state.dayAttdlist = [];
    }
}
});

export const dailyAttendAction = dailyAttendSlice.actions;

export default dailyAttendSlice.reducer;
