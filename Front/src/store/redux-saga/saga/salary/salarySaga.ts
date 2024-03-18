import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { attdActions } from 'store/redux-saga/reducer/attendance/attendanceReducer';

function* getEmpList() {
  try {
    console.log('지출증빙성공?');
  } catch (error) {
    console.log('에러임', error);
  }
}

export function* watchFetchReceiptList() {
  yield takeLatest(attdActions.getEmpListRequest, getEmpList);
}

export default function* attdSaga() {
  yield all([fork(watchFetchReceiptList)]);
}
