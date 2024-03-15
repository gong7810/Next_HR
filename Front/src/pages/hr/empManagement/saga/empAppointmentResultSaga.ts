import { empAppointmentResultAction } from '../slices/empAppointmentResultReducer';
import { put, takeEvery, all, call } from 'redux-saga/effects';

import * as api from '../api/api';

type typeAction = { payload: any; type: string };
type empAppointment = { errorCode: number; errorMsg: string; empList: [] };

//generator함수안에서 yield 안쓰면은 해당 코드가 실행이 안됩니다.

export function* getAppointmentResultActionSaga(action: typeAction) {
  console.log('getAppointmentResultActionSaga called');
  const data: empAppointment = yield call(api.getAppointmentResult);
  yield put(empAppointmentResultAction.EMP_APPOINTMENT_RESULT_STATUS(data));
}

// action과 api 요청을 보내주는 함수를 호출하는 saga를 연결해주는 saga
// ---> saga가 작동을 잘 하지 않는거 같은데 원인을 찾지를 못하겠다.
//      saga가 한번 호출된 다음에 다시 호출하면 호출을 할수가 없다.
//      같은 방식의 다른 사가들은 정상 작동을 하는데 여기서는 문제가
//      발생한다. api를 요청을 보내는 비동기 함수를 호출할때는 call
//      이나 fork 를 사용해야 한다.
export function* onEmpAppointmentResultSaga() {
  yield takeEvery(empAppointmentResultAction.EMP_APPOINTMENT_RESULT, getAppointmentResultActionSaga);
}

export function* empAppointmentResultSaga() {
  yield all([call(onEmpAppointmentResultSaga)]);
}
