import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { baseActions } from 'store/redux-saga/reducer/base/baseReducer';
import { getAuthList, getCodeList } from 'store/redux-saga/api/base';
import { AxiosResponse } from 'axios';

// 권한 조회
function* fetchAuthList() {
  try {
    const response: AxiosResponse = yield call(getAuthList);
    console.log('권한 조회 response', response);
    yield put(baseActions.getAuthListSuccess(response.data.list));
  } catch (error: any) {
    console.log(error);
  }
}

// 코드 조회
function* fetchCodeList() {
  try {
    const response: AxiosResponse = yield call(getCodeList);
    console.log('코드 조회 response', response);
    yield put(baseActions.getCodeListSuccess(response.data.list));
  } catch (error: any) {
    console.log(error);
  }
}

export function* watchBaseActions() {
  yield takeLatest(baseActions.getAuthListRequest, fetchAuthList);
  yield takeLatest(baseActions.getCodeListRequest, fetchCodeList);
}

export default function* baseSaga() {
  yield all([fork(watchBaseActions)]);
}
