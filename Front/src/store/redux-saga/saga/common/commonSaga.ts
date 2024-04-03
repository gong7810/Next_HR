import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { commonActions } from 'store/redux-saga/reducer/common/commonReducer';
import { AxiosResponse } from 'axios';
import { getLoginToken, getTokenCheck } from 'store/redux-saga/api/common';
import Swal from 'sweetalert2';

// 로그인 + 회원 인증 및 토근 생성
function* fetchLoginToken(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(getLoginToken, payload);
    console.log('jwt 토큰 조회 reponse', response);
    if (response.data.errorCode == '로그인 성공') {
      localStorage.setItem('empCode', payload.id);
      yield put(commonActions.getLoginTokenSuccess(response.data));
      Swal.fire({
        icon: 'success',
        title: '로그인 성공',
        text: `${localStorage.getItem('empName')} ${localStorage.getItem('position')}님 접속을 환영합니다.`
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: '잘못된 접근입니다.',
        text: 'id, pw를 확인해주세요.'
      });
    }
  } catch (error: any) {
    console.log(error);
  }
}

// 토큰 검증 제너레이터
function* fetchTokenCheck(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(getTokenCheck, payload);
    console.log('토큰 유효성 검사 ', response);
  } catch (error: any) {
    console.log(error);
  }
}

// 토큰 삭제
function* removeToken() {
  try {
    yield put(commonActions.removeTokenSuccess());
  } catch (error: any) {
    console.log(error);
  }
}

export function* watchCommonActions() {
  yield takeLatest(commonActions.getLoginTokenRequest, fetchLoginToken);
  yield takeLatest(commonActions.getTokenCheckRequest, fetchTokenCheck);
  yield takeLatest(commonActions.removeTokenRequest, removeToken);
}

export default function* commonSaga() {
  yield all([fork(watchCommonActions)]);
}
