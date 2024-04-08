import { all, fork } from 'redux-saga/effects';
import baseSalarySaga from './hr/salary/BaseSalarySaga';
import positionSaga from './hr/base/position';
import HolidaySaga from './hr/base/holiday';
import attdSaga from 'store/redux-saga/saga/attendance/attendanceSaga';
import dailyAttendSaga from 'store/redux-saga/saga/attendance/DailyAttendSaga';
import commonSaga from 'store/redux-saga/saga/common/commonSaga';
import baseSaga from 'store/redux-saga/saga/base/baseSaga';
import empManagementRootSaga from '../../pages/hr/empManagement/saga/index';
import salSaga from 'store/redux-saga/saga/salary/salarySaga';

function* rootSaga() {
  yield all([
    fork(baseSalarySaga),
    fork(positionSaga),
    fork(HolidaySaga), // 다른 Saga들도 추가
    fork(empManagementRootSaga),
    fork(attdSaga),
    fork(dailyAttendSaga),
    fork(commonSaga),
    fork(baseSaga),
    fork(salSaga)
  ]);
}

export default rootSaga;
