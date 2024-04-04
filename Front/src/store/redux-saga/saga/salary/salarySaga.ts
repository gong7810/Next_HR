import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { salActions } from 'store/redux-saga/reducer/salary/salaryReducer';
import { getDeptList, getEmpList, getSeverancePayList, deleteSeverancePay, insertSeverancePay } from 'store/redux-saga/api/salary';
import { AxiosResponse } from 'axios';

// 부서 조회
function* FetchDeptList() {
  try {
    const response: AxiosResponse = yield call(getDeptList);
    console.log('부서 조회 response', response);
    yield put(salActions.getDeptListSuccess(response.data.list));
  } catch (error: any) {
    console.log(error);
  }
}

// 사원 조회
function* FetchEmpList(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(getEmpList, payload);
    console.log('사원 조회 response', response);
    yield put(salActions.getEmptListSuccess(response.data.list));
  } catch (error: any) {
    console.log(error);
  }
}

// 퇴직금 조회
function* FetchSeverancePayList(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(getSeverancePayList, payload);
    console.log('조회 response', response);
    yield put(salActions.getSeverancePayListSuccess(response.data.severancePayList));
  } catch (error: any) {
    console.log(error);
  }
}

// 퇴직금 삭제
function* removeSeverancePayList(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(deleteSeverancePay, payload);
    console.log('삭제 response', response);
  } catch (error: any) {
    console.log(error);
  }
}

// 퇴직금 등록
function* registSeverancePay(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(insertSeverancePay, payload);
    console.log('등록 response', response);
  } catch (error: any) {
    console.log(error);
  }
}

export function* watchSalActions() {
  yield takeLatest(salActions.getDeptListRequest, FetchDeptList);
  yield takeLatest(salActions.getEmpListRequest, FetchEmpList);
  yield takeLatest(salActions.getSeverancePayListRequest, FetchSeverancePayList);
  yield takeLatest(salActions.removeSeverancePayListRequest, removeSeverancePayList);
  yield takeLatest(salActions.registSeverancePayRequest, registSeverancePay);
}

export default function* salSaga() {
  yield all([fork(watchSalActions)]);
}
