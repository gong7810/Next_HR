import { all, call } from 'redux-saga/effects';
import { attdSaga } from './attendanceSaga';
import { dailyAttendSaga } from './DailyAttendSaga';

export default function* dailyAttdManagementRootSaga() {
  yield all([
    call(attdSaga),
    call(dailyAttendSaga)
  ]);
}
