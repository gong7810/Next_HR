import { all, call } from 'redux-saga/effects';
import { empInfoSaga } from './empInfoSaga';
import { registerEmpSaga } from './registerEmpSaga';
import { empEvalSaga } from './empEvalSaga';
import { empEvalResultSaga } from './empEvalResultSaga';
import { empEvalManagementSaga } from './empEvalManagementSaga';
import { empAppointmentSaga } from './registerEmpAppointmentSaga';
import { empAppointmentManagementSaga } from './empAppointmentManagementSaga';
import { empAppointmentResultSaga } from './empAppointmentResultSaga';

export default function* empManagementRootSaga() {
  yield all([
    call(registerEmpSaga),
    call(empInfoSaga),
    call(empEvalResultSaga),
    call(empEvalSaga),
    call(empEvalManagementSaga),
    call(empAppointmentSaga),
    call(empAppointmentManagementSaga),
    call(empAppointmentResultSaga)
  ]);
}
