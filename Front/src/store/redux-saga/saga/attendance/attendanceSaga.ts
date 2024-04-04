import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { attdActions } from 'store/redux-saga/reducer/attendance/attendanceReducer';
import { getEmplist, getRestAttdList, insertRestAttd, updateRestAttd, deleteRestAttd } from 'store/redux-saga/api/attendance';
import { AxiosResponse } from 'axios';

// 사원 조회
function* FetchEmpList() {
  try {
    const response: AxiosResponse = yield call(getEmplist);
    console.log('사원 조회 response', response);
    yield put(attdActions.getEmpListSuccess(response.data.list));
  } catch (error: any) {
    console.log(error);
  }
}

// 근태외 관리 조회
function* FetchRestAttdList(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(getRestAttdList, payload);
    console.log('조회 response', response);
    yield put(attdActions.getRestAttdListSuccess(response.data.restAttdList));
  } catch (error: any) {
    console.log(error);
  }
}

// 근태외 등록
function* registRestAttd(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(insertRestAttd, payload);
    console.log('등록 response', response);
  } catch (error: any) {
    console.log(error);
  }
}

// 근태외 승인/취소
function* approvalRestAttd(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(updateRestAttd, payload);
    console.log('승인/취소 response', response);
  } catch (error: any) {
    console.log(error);
  }
}

// 근태외 삭제
function* removeRestAttd(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(deleteRestAttd, payload);
    console.log('삭제 response', response);
  } catch (error: any) {
    console.log(error);
  }
}

export function* watchAttdActions() {
  yield takeLatest(attdActions.getEmpListRequest, FetchEmpList);
  yield takeLatest(attdActions.getRestAttdListRequest, FetchRestAttdList);
  yield takeLatest(attdActions.registRestAttdRequest, registRestAttd);
  yield takeLatest(attdActions.approvalRestAttdRequest, approvalRestAttd);
  yield takeLatest(attdActions.romoveRestAttdRequest, removeRestAttd);
}

export default function* attdSaga() {
  yield all([fork(watchAttdActions)]);
}
