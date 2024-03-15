import { empEvalAction } from '../slices/empEvalReducer';
import { takeEvery, all, call } from 'redux-saga/effects';

import * as api from '../api/api';
type typeAction = { payload: any; type: string };
type empEvalRequest = { errorCode: number; errorMsg: string };

// generator 함수는 yield 안하면은 해당 라인의 코드 실행 안함
// console.log()는 예외인거 같다.

export function* registerEmpEvalActionSaga(action: typeAction) {
  console.log(action.payload);
  const data: empEvalRequest = yield call(api.registerEmpEval, action);
  console.log('data from empEval saga', data);
}

// action과 api 요청을 보내주는 함수를 호출하는 saga를 연결해주는 saga
export function* onEmpEvalSaga() {
  yield takeEvery(empEvalAction.EMP_EVAL_REQUSTED, registerEmpEvalActionSaga);
}

export function* empEvalSaga() {
  yield all([call(onEmpEvalSaga)]);
}
