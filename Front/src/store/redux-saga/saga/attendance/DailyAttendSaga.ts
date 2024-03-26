import { dailyAttendAction } from 'store/redux-saga/reducer/attendance/DailyAttendReducer';
import { takeEvery, all, call, put } from 'redux-saga/effects';
import * as api from 'store/redux-saga/api/attendance';
import { typeAction } from 'types/attendance/types';
type dailyAttendRequest = { dayAttdlist: []; errorMsg: ''; errorCode: 0; empList: [] };

// generator 함수는 yield 안하면은 해당 라인의 코드 실행 안함
// console.log()는 예외인거 같다.

export function* dailyAttendInsertSaga(action: typeAction) {
  yield console.log('This is Saga!! dailyAttendInsertSaga called!!! ', action.payload);

  const data: dailyAttendRequest = yield call(api.registerDailyAttend, action);
  console.log('data from dailyAttendInsertSaga:', data);
}

export function* dailyAttendSearchSaga(action: typeAction) {
  yield console.log('This is Saga!! dailyAttendSearchSaga called!!! ', action.payload);

  const data: dailyAttendRequest = yield call(api.searchDailyAttend, action);
  console.log('data from dailyAttendSearchSaga:', data);
  yield put(dailyAttendAction.DAILY_ATTEND_SEARCH_FETCH_STATUS(data));
}

export function* dailyAttendModifySaga(action: typeAction) {
  yield console.log('This is Saga!! dailyAttendModifySaga called!!! ', action.payload);

  const data: dailyAttendRequest = yield call(api.modifyDailyAttend, action);
  console.log('data from dailyAttendModifySaga:', data);
  yield put(dailyAttendAction.DAILY_ATTEND_MODIFY_FETCH_STATUS(data));
}

export function* dailyAttendSearchEmplistSaga(action: typeAction) {
  yield console.log('This is Saga!! dailyAttendSearchEmplistSaga called!!! ', action.payload);

  const data: dailyAttendRequest = yield call(api.getEmpList, action);
  console.log('data from dailyAttendSearchEmplistSaga:', data);
  yield put(dailyAttendAction.DAILY_ATTEND_SEARCH_EMPLIST_FETCH_STATUS(data));
}

export function* dailyAttendFinalizeSaga(action: typeAction) {
  yield console.log('This is Saga!! dailyAttendSearchEmplistSaga called!!! ', action.payload);

  const data: dailyAttendRequest = yield call(api.finalizeDailyAttend, action);
  console.log('data from dailyAttendSearchEmplistSaga:', data);
  yield put(dailyAttendAction.DAILY_ATTEND_FINALIZE_FETCH_STATUS(data));
}

// action과 api 요청을 보내주는 함수를 호출하는 saga를 연결해주는 saga
// empEvalResultAction.DAILY_ATTEND_RESULT_FETCH_REQUESTED는 액션생성함수를 호출하여 액션을 생성함.
export function* onDailyAttendSaga() {
  yield takeEvery(dailyAttendAction.DAILY_ATTEND_INSERT_FETCH_REQUESTED, dailyAttendInsertSaga);
  yield takeEvery(dailyAttendAction.DAILY_ATTEND_SEARCH_FETCH_REQUESTED, dailyAttendSearchSaga);
  yield takeEvery(dailyAttendAction.DAILY_ATTEND_MODIFY_FETCH_REQUESTED, dailyAttendModifySaga);
  yield takeEvery(dailyAttendAction.DAILY_ATTEND_SEARCH_EMPLIST_FETCH_REQUESTED, dailyAttendSearchEmplistSaga);
  yield takeEvery(dailyAttendAction.DAILY_ATTEND_FINALIZE_FETCH_REQUESTED, dailyAttendFinalizeSaga);
}

export default function* dailyAttendSaga() {
  yield all([call(onDailyAttendSaga)]);
}
