import { createSlice } from '@reduxjs/toolkit';

type empList = { empList: []; message: string | null; fetchStatus: boolean };

let initialState: empList = { empList: [], message: '', fetchStatus: false };

const empInfoSlice = createSlice({
  name: 'emp',
  initialState: initialState,
  reducers: {
    EMP_FETCH_REQUESTED(state, action) {
      console.log('reducer is okay ');
      console.log('EMP_FETCH_REQUESTED:', action.payload, action.type);

      // 여기의 코드는 state의 값을 변경해 주는거 같이 보인다. 하지만, 이것은 toolkit이 내부적으로 immer 라이브러리를 사용하기 때문이라고 한다.
    },

    EMP_FETCH_STATUS(state, action) {
      console.log('action.payload at EMP_FETCH_STATUS:', action.payload);
      const { empList, message } = action.payload;

      state.empList = empList;
      state.message = message; // 여기서 받은 메세지는 empInfo 컴포넌트에서 사용하면은 될거 같다.

      console.log('log from emp_feth_status', state.empList, state.message);
    },
    EMP_UPDATE_REQUESTED(state, action) {
      console.log('data from reducer is :', action.payload);
      console.log('empUpdate type dispatched.');
    },
    EMP_UPDATE_STATUS(state, action) {
      state.fetchStatus = !state.fetchStatus;
    },
    EMP_DELETE_REQUESTED(state, ation) {
      console.log('empDelete type dispatched.');
    },
    EMP_DELETE_STATUS(state, action) {
      const { errorCode, errorMsg } = action.payload;
      console.log(errorCode, errorMsg);
      state.fetchStatus = !state.fetchStatus; // 상태를 토글로 변경한다.
    }
  }
});

export const empInfoAction = empInfoSlice.actions;

export default empInfoSlice;
