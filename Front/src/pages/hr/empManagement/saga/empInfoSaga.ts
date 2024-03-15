import { empInfoAction } from '../slices/empInfoReducer';
import { put, takeEvery, all, call } from 'redux-saga/effects';

import * as api from '../api/api';

type empRequest = { empList: []; message: '' };

// generator 함수는 yield 안하면은 해당 라인의 코드 실행 안함
// console.log()는 예외인거 같다.

type typeAction = { payload: any; type: string };

export function* empInfoActionSaga(action: typeAction) {
  yield console.log('empEvalResultActionSaga called!!! ', action.payload);

  const data: empRequest = yield call(api.getEmpList, action);
  yield put(empInfoAction.EMP_FETCH_STATUS(data));
  console.log('data from empInfoActionSaga:', data);
}

export function* empUpdateActionSaga(action: typeAction) {
  const data: empRequest = yield call(api.updateEmpInfo, action);
  yield put(empInfoAction.EMP_UPDATE_STATUS(data));
}

export function* empDeleteActionSaga(action: typeAction) {
  const data: empRequest = yield call(api.deleteEmpInfo, action);
  yield put(empInfoAction.EMP_DELETE_STATUS(data));
}

// action과 api 요청을 보내주는 함수를 호출하는 saga를 연결해주는 saga
export function* onEmpInfoSaga() {
  yield takeEvery(empInfoAction.EMP_FETCH_REQUESTED, empInfoActionSaga);
  yield takeEvery(empInfoAction.EMP_UPDATE_REQUESTED, empUpdateActionSaga);
  yield takeEvery(empInfoAction.EMP_DELETE_REQUESTED, empDeleteActionSaga);
}

export function* empInfoSaga() {
  yield all([call(onEmpInfoSaga)]);
}
