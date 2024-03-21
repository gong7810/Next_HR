import { all, fork } from 'redux-saga/effects';
import baseSalarySaga from './hr/salary/BaseSalarySaga';
import positionSaga from './hr/base/position';
import HolidaySaga from './hr/base/holiday';
import attdSaga from 'store/redux-saga/saga/attendance/attendanceSaga';
import empManagementRootSaga from '../../pages/hr/empManagement/saga/index';

function* rootSaga() {
  yield all([
    fork(baseSalarySaga),
    fork(positionSaga),
    fork(HolidaySaga), // 다른 Saga들도 추가
    fork(empManagementRootSaga),
    fork(attdSaga)
  ]);
}

export default rootSaga;
