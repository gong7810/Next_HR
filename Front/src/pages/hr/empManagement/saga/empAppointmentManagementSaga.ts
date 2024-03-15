import { empAppointmentManagementAction } from '../slices/empAppointmentManagementReducer';
import { put, takeEvery, all, call } from 'redux-saga/effects';

import * as api from '../api/api';

type typeAction = { payload: any; type: string };
type empAppointment = { errorCode: number; errorMsg: string; empList: [] };

//generator함수안에서 yield 안쓰면은 해당 코드가 실행이 안됩니다.

export function* getEmpAppointmentActionSaga(action: typeAction) {
  console.log('getAppointmentActionSaga called');
  const data: empAppointment = yield call(api.getEmpAppointment);
  console.log('data', data);
  yield put(empAppointmentManagementAction.EMP_APPOINTMENT_FETCH_STATUS(data));
}

export function* modifyApprovedEmpAppointmentActionSaga(action: typeAction) {
  console.log('modifyApprovedEmpAppointmentActionSaga called');
  const data: empAppointment = yield call(api.modifyApprovedEmpAppointment, action);
  console.log('data ia :', data);
  yield put(empAppointmentManagementAction.MODIFY_APPROVED_EMP_APPOINTMENT_STATUS(data));
}

export function* modifyRejectedEmpAppointmentActionSaga(action: typeAction) {
  console.log('modifyRejectedEmpAppointmentActionSaga called', action);
  const data: empAppointment = yield call(api.modifyRejectedEmpAppointment, action);
  console.log('modify rejected empAppointment : ', data);
  yield put(empAppointmentManagementAction.MODIFY_REJECTED_EMP_APPOINTMENT_STATUS(data));
}

// action과 api 요청을 보내주는 함수를 호출하는 saga를 연결해주는 saga
// ---> saga가 작동을 잘 하지 않는거 같은데 원인을 찾지를 못하겠다.
//      saga가 한번 호출된 다음에 다시 호출하면 호출을 할수가 없다.
//      같은 방식의 다른 사가들은 정상 작동을 하는데 여기서는 문제가
//      발생한다. api를 요청을 보내는 비동기 함수를 호출할때는 call
//      이나 fork 를 사용해야 한다.
export function* onEmpAppointmentManagementSaga() {
  yield takeEvery(empAppointmentManagementAction.EMP_APPOINTMENT_FETCH_REQUESTED, getEmpAppointmentActionSaga);
  yield takeEvery(empAppointmentManagementAction.MODIFY_APPROVED_EMP_APPOINTMENT, modifyApprovedEmpAppointmentActionSaga);
  yield takeEvery(empAppointmentManagementAction.MODIFY_REJECTED_EMP_APPOINTMENT, modifyRejectedEmpAppointmentActionSaga);
}

export function* empAppointmentManagementSaga() {
  yield all([call(onEmpAppointmentManagementSaga)]);
}
