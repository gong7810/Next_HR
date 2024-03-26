import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { commonActions } from 'store/redux-saga/reducer/common/commonReducer';
import { AxiosResponse } from 'axios';
import { getLoginToken } from 'store/redux-saga/api/common';

function* fetchLoginToken(action: any) {
  try {
    const response: AxiosResponse = yield call(getLoginToken);
    console.log('jwt 토큰 조회 reponse', response);
    yield put(commonActions.getLoginTokenSuccess(response.data.data));
  } catch (error: any) {
    console.log(error);
  }
}

export function* watchCommonActions() {
  yield takeLatest(commonActions.getLoginTokenRequest, fetchLoginToken);
}

export default function* commonSaga() {
  yield all([fork(watchCommonActions)]);
}
