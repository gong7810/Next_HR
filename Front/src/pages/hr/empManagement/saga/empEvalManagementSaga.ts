import { empEvalManagementAction } from '../slices/empEvalManagementReducer';
import { put, takeEvery, all, call } from 'redux-saga/effects';

import * as api from '../api/api';
type typeAction = { payload: any; type: string };
type empEval = { errorCode: number; errorMsg: string; empList: [] };

//generator함수안에서 yield 안쓰면은 해당 코드가 실행이 안됩니다.

export function* getEmpEvalActionSaga(action: typeAction) {
  const data: empEval = yield call(api.getEmpEvalEndedList);
  console.log('data from getEmpEvalActionSaga', data);
  yield put(empEvalManagementAction.EMP_EVAL_FETCH_STATUS(data));
}

export function* modifyApprovedEmpEvalActionSaga(action: typeAction) {
  console.log('modifyApprovedEmpEvalActionSaga called ', action.payload);
  const data: empEval = yield call(api.modifyApprovedEmpEval, action);
  yield put(empEvalManagementAction.MODIFY_APPROVED_EMP_EVAL_STATUS(data));
}
// generator 함수는 yield 안하면은 해당 라인의 코드 실행 안함
// console.log()는 예외인거 같다.
export function* modifyRejectedEmpEvalActionSaga(action: typeAction) {
  console.log('modifyRejectedEmpEvalActionSaga called ', action.payload);
  const data: empEval = yield api.modifyRejectedEmpEval(action);
  yield put(empEvalManagementAction.MODIFY_REJECTED_EMP_EVAL_STATUS(data));
}

export function* empEvalDeleteActionSaga(action: typeAction) {
  console.log('empEvalDeleteActionSaga called', action.payload);
  const data: empEval = yield api.deleteEmpEval(action);
  yield put(empEvalManagementAction.DELETE_EMP_EVAL_STATUS(data));
}

// action과 api 요청을 보내주는 함수를 호출하는 saga를 연결해주는 saga
export function* onEmpEvalManagementSaga() {
  yield takeEvery(empEvalManagementAction.EMP_EVAL_FETCH_REQUESTED, getEmpEvalActionSaga);
  yield takeEvery(empEvalManagementAction.MODIFY_APPROVED_EMP_EVAL, modifyApprovedEmpEvalActionSaga);
  yield takeEvery(empEvalManagementAction.MODIFY_REJECTED_EMP_EVAL, modifyRejectedEmpEvalActionSaga);
  yield takeEvery(empEvalManagementAction.DELETE_EMP_EVAL, empEvalDeleteActionSaga);
}

export function* empEvalManagementSaga() {
  yield all([call(onEmpEvalManagementSaga)]);
}
