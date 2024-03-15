import { empEvalResultAction } from '../slices/empEvalResultReducer';
import { put, takeEvery, all, call } from 'redux-saga/effects';

import * as api from '../api/api';
type typeAction = { payload: any; type: string };
type empEvalRequest = { empList: []; errorCode: string; errorMsg: string };

// generator 함수는 yield 안하면은 해당 라인의 코드 실행 안함
// console.log()는 예외인거 같다.

export function* empEvalResultActionSaga() {
  yield console.log('empEvalResultActionSaga called!!! ');
  const data: empEvalRequest = yield call(api.getEmpEvalResult);
  console.log('data from empEvalResultActionSaga:', data);
  yield put(empEvalResultAction.EMP_EVAL_RESULT_FETCH_STATUS(data));
}

export function* empEvalResultByApprovalConditionActionSaga(action: typeAction) {
  console.log('empEvalResultByApprovalConditionActionSaga called');
  console.log('value is :', action.payload);

  const data: empEvalRequest = yield call(api.getEmpEvalResultByApprovalCondition, action);
  console.log('data from empEvalResultByApprovalconditionActionSaga is :', data);
  yield put(empEvalResultAction.EMP_EVAL_RESULT_FETCH_REQUESTED_BY_APPROVAL_CONDITION_STATUS(data));
}
// action과 api 요청을 보내주는 함수를 호출하는 saga를 연결해주는 saga
export function* onEmpEvalResultSaga() {
  yield takeEvery(empEvalResultAction.EMP_EVAL_RESULT_FETCH_REQUESTED, empEvalResultActionSaga);
  yield takeEvery(empEvalResultAction.EMP_EVAL_RESULT_FETCH_REQUESTED_BY_APPROVAL_CONDITION, empEvalResultByApprovalConditionActionSaga);
}

export function* empEvalResultSaga() {
  yield all([call(onEmpEvalResultSaga)]);
}
