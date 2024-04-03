import { empAppointmentAction } from '../slices/empAppointmentRegistReducer';
import { put, takeEvery, all, call } from 'redux-saga/effects';

import * as api from '../api/api';

type typeAction = { payload: any; type: string };
type empRequest = { empList: []; errorCode: number; errorMsg: string };

// generator 함수는 yield 안하면은 해당 라인의 코드 실행 안함
// console.log()는 예외인거 같다.

export function* getEmpInfoSaga(action: typeAction) {
  console.log('getEmpInfoSaga called !!!');
  const data: empRequest = yield call(api.getEmpInfo, action);
  console.log('data at getEmpInfoSaga : ', data);
  yield put(empAppointmentAction.EMP_FETCH_STATUS(data));
}

export function* getHosuSaga(action: typeAction) {
  console.log('getHosuSaga called!!!');
  const data: { hosu: string } = yield call(api.getHosu);
  console.log('hosu arrived hosu data is : ', data.hosu);
  yield put(empAppointmentAction.GET_HOSU_STATUS(data));
}

export function* registerEmpAppointmentSaga(action: typeAction) {
  console.log('registerEmpAppointment called !!!');
  const data: empRequest = yield call(api.registerEmpAppointment, action);
  console.log(data);
  yield put(empAppointmentAction.REGISTER_EMP_APPOINTMENT_STATUS(data));
}

export function* onEmpAppointmentSaga() {
  yield takeEvery(empAppointmentAction.REGISTER_EMP_APPOINTMENT_REQUESTED, registerEmpAppointmentSaga);
  yield takeEvery(empAppointmentAction.EMP_FETCH_REQUESTED, getEmpInfoSaga);
  yield takeEvery(empAppointmentAction.GET_HOSU_REQUESTED, getHosuSaga);
}

export function* empAppointmentRegistSaga() {
  yield all([call(onEmpAppointmentSaga)]);
}
