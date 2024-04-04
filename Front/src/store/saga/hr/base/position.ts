import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { getPositionSuccess, getPosition1 } from 'store/slices/hr/base/position';
import { getPosition } from 'store/api/base/index';

// 직급정보 조회
function* handlePosition() {
  try {
    const { positionList } = yield call(getPosition);
    console.log('사가사가', positionList);
    yield put(getPositionSuccess({ positionList }));
  } catch (error) {
    console.log('쉬발');
  }
}

function* watchGetPosition() {
  yield takeLatest(getPosition1, handlePosition);
}

export default function* positionSaga() {
  yield fork(watchGetPosition);
}
