import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { attdActions } from 'store/redux-saga/reducer/attendance/attendanceReducer';
import { fetchEmplist } from 'store/redux-saga/api/attendance';
import { AxiosResponse } from 'axios';

function* getEmpList() {
  try {
    const response: AxiosResponse = yield call(fetchEmplist);
    console.log('response', response);
    // yield put(selectReceiptSuccess(response.receiptList));
    // console.log('지출증빙성공?', response);
  } catch (error) {
    console.log('에러임', error);
  }
}

export function* watchFetchReceiptList() {
  yield takeLatest(attdActions.getEmpListRequest, getEmpList);
}

export function* attdSaga() {
  yield all([call(watchFetchReceiptList)]);
}
