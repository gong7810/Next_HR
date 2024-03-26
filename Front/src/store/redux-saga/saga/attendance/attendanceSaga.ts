import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { attdActions } from 'store/redux-saga/reducer/attendance/attendanceReducer';
import {
  getEmplist,
  getRestAttdList,
  insertRestAttd,
  updateRestAttd,
  deleteRestAttd,
  insertBreaKAttd,
  getBreakAttdList,
  updateBreakAttd,
  deleteBreakAttd
} from 'store/redux-saga/api/attendance';
import { AxiosResponse } from 'axios';

// 사원 조회
function* fetchEmpList() {
  try {
    const response: AxiosResponse = yield call(getEmplist);
    console.log('사원 조회 response', response);
    yield put(attdActions.getEmpListSuccess(response.data.list));
  } catch (error: any) {
    console.log(error);
  }
}

// 근태외 관리 조회
function* fetchRestAttdList(action: any) {
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
function* approvalRestAttdList(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(updateRestAttd, payload);
    console.log('승인/취소 response', response);
  } catch (error: any) {
    console.log(error);
  }
}

// 근태외 삭제
function* removeRestAttdList(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(deleteRestAttd, payload);
    console.log('삭제 response', response);
  } catch (error: any) {
    console.log(error);
  }
}

// 연차 내역 조회
function* fetchBreakAttdList(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(getBreakAttdList, payload);
    console.log('조회 response', response);
    yield put(attdActions.getBreakAttdListSuccess(response.data.breakAttdList));
  } catch (error: any) {
    console.log(error);
  }
}

// 연차 신청
function* registBreakAttd(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(insertBreaKAttd, payload);
    console.log('신청 response', response);
  } catch (error: any) {
    console.log(error);
  }
}

// 연차 승인 / 반려
function* approvalBreakAttdList(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(updateBreakAttd, payload);
    console.log('승인/반려/취소 response', response);
  } catch (error: any) {
    console.log(error);
  }
}

// 연차 삭제
function* removeBreakAttdList(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(deleteBreakAttd, payload);
    console.log('삭제 response', response);
  } catch (error: any) {
    console.log(error);
  }
}

export function* watchAttdActions() {
  yield takeLatest(attdActions.getEmpListRequest, fetchEmpList);
  yield takeLatest(attdActions.getRestAttdListRequest, fetchRestAttdList);
  yield takeLatest(attdActions.registRestAttdRequest, registRestAttd);
  yield takeLatest(attdActions.approvalRestAttdRequest, approvalRestAttdList);
  yield takeLatest(attdActions.romoveRestAttdRequest, removeRestAttdList);
  yield takeLatest(attdActions.getBreakAttdListRequest, fetchBreakAttdList);
  yield takeLatest(attdActions.registBreakAttdRequest, registBreakAttd);
  yield takeLatest(attdActions.approvalBreakAttdRequest, approvalBreakAttdList);
  yield takeLatest(attdActions.romoveBreakAttdRequest, removeBreakAttdList);
}

export default function* attdSaga() {
  yield all([fork(watchAttdActions)]);
}
